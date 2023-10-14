import type { Context } from "koa";
import type { TInsertUserBody, TRegisterUserBody, TUpdateUserBody } from "./schemas";

import { ValidationError } from "@base/errors";

import usersRepo from "./repository";
import jwt from "@helpers/jwt";
import { loginUser } from "./logic";
import { reply } from "@helpers/reply";

export const index = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (id) {
        const user = await usersRepo.find(ctx.db, id as string);
        return reply(ctx, 200, user);
    }
    const users = await usersRepo.finds(ctx.db);
    return reply(ctx, 200, users);
};

export const save = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.db, ctx.request.body as TInsertUserBody);
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

export const login = async (ctx: Context) => {};

export const register = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.db, ctx.request.body as TRegisterUserBody);
    loginUser(ctx, user);
    return reply(ctx, 201, user);
};

export const profile = async (ctx: Context) => {};

export const forgotPassword = async (ctx: Context) => {};

export const resetPassword = async (ctx: Context) => {};

export const changePassword = async (ctx: Context) => {};
