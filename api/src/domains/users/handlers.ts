import type {
    TDeleteUserQuery,
    TGetUserQuery,
    TInsertUserBody,
    TLoginUserBody,
    TRegisterUserBody,
    TUpdateUserBody,
    TUpdateUserQuery,
} from "./schemas";

import type { Context } from "koa";
import type { TUser } from "./repository";

import { userResponse } from "./schemas";
import { BadRequestError } from "@/helpers/errors";
import { reply } from "@/helpers/units";
import { loginUser, logoutUser } from "./logic";

import usersRepo from "./repository";
import crypto from "@/helpers/crypto";

export const register = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.request.body as TRegisterUserBody);
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
        throw new BadRequestError("invalid credentials");
    }
    await loginUser(ctx, user);
    return reply(ctx, 200, userResponse(user));
};

export const logout = async (ctx: Context) => {
    logoutUser(ctx);
    return reply(ctx, 204);
};

export const index = async (ctx: Context) => {
    const { id } = (ctx.request.query as TGetUserQuery) || {};
    if (id) {
        const user = await usersRepo.findById(id as string);
        return reply(ctx, 200, user);
    }
    const users = await usersRepo.finds();
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
    const { id } = (ctx.request.query as TUpdateUserQuery) || {};
    const user = await usersRepo.update(id as string, ctx.request.body as TUpdateUserBody);
    return reply(ctx, 200, userResponse(user));
};

export const destroy = async (ctx: Context) => {
    const { id } = (ctx.request.query as TDeleteUserQuery) || {};
    await usersRepo.destroy(id as string);
    return reply(ctx, 204);
};

export const forgotPassword = async (ctx: Context) => {};

export const resetPassword = async (ctx: Context) => {};

export const changePassword = async (ctx: Context) => {};
