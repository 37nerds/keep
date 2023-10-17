import { TInsertUserBody, TLoginUserBody, TRegisterUserBody, TUpdateUserBody } from "./schemas";

import { Context } from "koa";
import { BadRequestError, ValidationError } from "@base/errors";
import { reply } from "@helpers/reply";
import { TUser } from "./repository";
import { loginUser, logoutUser } from "./logic";

import usersRepo from "./repository";
import crypto from "@helpers/crypto";

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

export const logout = async (ctx: Context) => {
    logoutUser(ctx);
    return reply(ctx, 204);
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
