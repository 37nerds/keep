import {
    TInsertUserBody,
    TLoginUserBody,
    TRegisterUserBody,
    TUpdateUserBody,
    userResponse,
} from "./schemas";

import { Context } from "koa";
import { BadRequestError, ValidationError } from "@base/errors";
import { reply } from "@helpers/reply";
import { TUser } from "./repository";
import { loginUser, logoutUser } from "./logic";

import usersRepo from "./repository";
import crypto from "@helpers/crypto";
import { warn } from "console";

export const register = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.request.body);
    await loginUser(ctx, user);
    return reply(ctx, 201, userResponse(user));
};

export const profile = async (ctx: Context) => {
    return reply(ctx, 200, userResponse(ctx.user));
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
    return reply(ctx, 200, userResponse(user));
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
    return reply(
        ctx,
        200,
        users.map((user) => userResponse(user)),
    );
};

export const save = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.request.body as TInsertUserBody);
    return reply(ctx, 201, userResponse(user));
};

export const update = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    const user = await usersRepo.update(ctx.db, id as string, ctx.request.body as TUpdateUserBody);
    return reply(ctx, 200, userResponse(user));
};

export const destroy = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    await usersRepo.destroy(ctx.db, id as string);
    return reply(ctx, 204);
};

export const forgotPassword = async (ctx: Context) => {};

export const resetPassword = async (ctx: Context) => {};

export const changePassword = async (ctx: Context) => {};
