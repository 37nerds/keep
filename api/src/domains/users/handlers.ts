import type { Context } from "koa";
import usersRepo from "./repository";
import validate from "../../helpers/validate";
import {
    TInsertUser,
    TUpdateUser,
    insertUserSchema,
    updateUserSchema,
} from "./requests";
import { ValidationError } from "../../helpers/errors";

const index = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (id) {
        const user = await usersRepo.find(ctx.db, id as string);
        ctx.body = user;
        return;
    }
    const users = await usersRepo.finds(ctx.db);
    ctx.body = users;
};

const save = async (ctx: Context) => {
    const payload = validate<TInsertUser>(insertUserSchema, ctx.request.body);
    const user = await usersRepo.insert(ctx.db, payload);
    ctx.body = user;
};

const update = async (ctx: Context) => {
    const payload = validate<TUpdateUser>(updateUserSchema, ctx.request.body);
    const user = await usersRepo.update(ctx.db, payload);
    ctx.body = user;
};

const destroy = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (!id) {
        throw new ValidationError("id is not found query string");
    }
    const user = await usersRepo.destroy(ctx.db, id as string);
    ctx.body = user;
    return;
};

const handlers = { index, save, update, destroy };

export default handlers;
