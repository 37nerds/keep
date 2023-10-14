import { Context } from "koa";
import { TUser } from "./repository";
import jwt from "@helpers/jwt";
import { hour } from "@helpers/time";

const AUTH_TOKEN = "auth_token";

export const loginUser = async (ctx: Context, user: TUser) => {
    const expireInHours = 2;

    const token = await jwt.generate({ username: user.username, email: user.email, name: user.name });

    ctx.cookies.set(AUTH_TOKEN, token, {
        httpOnly: true,
        maxAge: hour * expireInHours,
    });
};
