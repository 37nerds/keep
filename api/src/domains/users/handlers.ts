import {
    TInsertUserBody,
    TLoginUserBody,
    TRegisterUserBody,
    TUpdateUserBody,
    TUserResponse,
} from "./schemas";

import { Context } from "koa";
import { BadRequestError, ValidationError } from "@base/errors";
import { reply } from "@helpers/reply";
import { hour } from "@helpers/time";
import { TUser } from "./repository";

import usersRepo from "./repository";
import jwt from "@helpers/jwt";
import crypto from "@helpers/crypto";

export const AUTH_TOKEN = "auth_token";

const loginUser = async (ctx: Context, user: TUser) => {
    const expireInHours = 24 * 30;
    const token = await jwt.generate(
        {
            username: user.username,
            email: user.email,
            name: user.name,
        },
        expireInHours,
    );
    ctx.cookies.set(AUTH_TOKEN, token, {
        httpOnly: true,
        maxAge: hour * expireInHours,
    });
};

export const register = async (ctx: Context) => {
    const body = ctx.request.body as TRegisterUserBody;
    const { username, email } = body;
    let user: TUser | null;
    try {
        user = await usersRepo.find({ username });
    } catch (e: any) {
        user = null;
    }
    if (user) {
        throw new BadRequestError("username already exits");
    }
    try {
        user = await usersRepo.find({ email });
    } catch (e: any) {
        user = null;
    }
    if (user) {
        throw new BadRequestError("email already exits");
    }

    body.password = await crypto.hash(body.password);

    user = await usersRepo.insert(body);
    await loginUser(ctx, user);
    return reply(ctx, 201, { ...user, password: undefined });
};

export const profile = async (ctx: Context) => {
    return reply(ctx, 200, { ...ctx.user, password: undefined });
};

export const login = async (ctx: Context) => {
    const body = ctx.request.body as TLoginUserBody;
    const { username, email, password } = body || {};
    let user: TUser | null;
    if (username) {
        user = await usersRepo.find({ username });
    } else {
        user = await usersRepo.find({ email });
    }
    if (!(await crypto.compare(user.password, password))) {
        throw new BadRequestError("invalid credintails");
    }
    await loginUser(ctx, user);
    return reply(ctx, 200, { ...user, password: undefined });
};

export const index = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (id) {
        const user = await usersRepo.findById(id as string);
        return reply(ctx, 200, user);
    }
    const users = await usersRepo.finds(ctx.db);
    return reply(ctx, 200, users);
};

export const save = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.request.body as TInsertUserBody);
    return reply(ctx, 201, user);
};

export const update = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    const user = await usersRepo.update(ctx.db, id as string, ctx.request.body as TUpdateUserBody);
    return reply(ctx, 200, user);
};

export const destroy = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    await usersRepo.destroy(ctx.db, id as string);
    return reply(ctx, 204);
};

export const forgotPassword = async (ctx: Context) => {};

export const resetPassword = async (ctx: Context) => {};

export const changePassword = async (ctx: Context) => {};
