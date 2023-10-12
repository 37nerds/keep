import type { Context } from "koa";
import usersRepo from "./repository";
import validate from "../../helpers/validate";
import { TInsertUser, insertUserSchema } from "./requests";

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
    return;
};

const update = async (ctx: Context) => {};
const destroy = async (ctx: Context) => {};

const handlers = { index, save, update, destroy };

export default handlers;
