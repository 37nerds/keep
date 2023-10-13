import type { Context } from "koa";
import type { TInsertUser, TUpdateUser } from "./schemas";

import { ValidationError } from "../../base/errors";

import usersRepo from "./repository";

const index = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (id) {
        const user = await usersRepo.find(ctx.db, id as string);
        ctx.status = 200;
        ctx.body = user;
        return;
    }
    const users = await usersRepo.finds(ctx.db);
    ctx.status = 200;
    ctx.body = users;
};

const save = async (ctx: Context) => {
    const user = await usersRepo.insert(ctx.db, ctx.request.body as TInsertUser);
    ctx.status = 201;
    ctx.body = user;
};

const update = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (!id) {
        throw new ValidationError("id is not found query string");
    }
    const user = await usersRepo.update(
        ctx.db,
        id as string,
        ctx.request.body as TUpdateUser,
    );
    ctx.status = 200;
    ctx.body = user;
};

const destroy = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (!id) {
        throw new ValidationError("id is not found query string");
    }
    const user = await usersRepo.destroy(ctx.db, id as string);
    ctx.status = 204;
    ctx.body = user;
    return;
};

const handlers = { index, save, update, destroy };

export default handlers;
