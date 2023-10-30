import type { Context } from "koa";
import type { TUser } from "./repository";

import { USERS_LOGIN, USERS_LOGOUT } from "./index";
import { BadRequestError, ServerSideError } from "@helpers/errors";
import { times } from "@helpers/units";
import { emitter } from "@base/cache";

import jwt from "@helpers/jwt";
import usersRepo from "./repository";
import env from "@configs/env";
import log from "@helpers/log";

const AUTH_TOKEN = "auth_token";

export type TAuthTokenPayload = {
    username: string;
    email: string;
    name?: string;
};

export const loginUser = async (ctx: Context, user: TUser) => {
    try {
        const expireInHours = 24 * 30;
        const payload: TAuthTokenPayload = {
            username: user.username,
            email: user.email,
            name: user.name,
        };
        const token = await jwt.generate(payload, expireInHours);
        ctx.cookies.set(AUTH_TOKEN, token, {
            httpOnly: true,
            secure: env.NODE_ENV === "dev" ? false : true,
            sameSite: "none",
            secureProxy: true,
        });
        emitter().emit(USERS_LOGIN, user, ctx.request.ip, ctx.request.headers["user-agent"]);
    } catch (e: any) {
        log.debug(e);
        throw new ServerSideError("unable to generate or set the token cookie");
    }
};

export const logoutUser = (ctx: Context) => {
    ctx.cookies.set(AUTH_TOKEN, "", { httpOnly: true, maxAge: 0 });
    emitter().emit(USERS_LOGOUT);
};

export const verifyAuthToken = async (ctx: Context): Promise<TUser> => {
    let decoded: TAuthTokenPayload;
    try {
        log.debug(ctx.cookies.get(AUTH_TOKEN));
        const authToken = ctx.cookies.get(AUTH_TOKEN);
        decoded = (await jwt.verify(authToken || "")) as TAuthTokenPayload;
    } catch (e: any) {
        throw new BadRequestError(e?.message || "auth token is invalid");
    }
    return await usersRepo.find({ email: decoded?.email || "" });
};
