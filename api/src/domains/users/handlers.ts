import { Context } from "koa";
import usersRepo from "./repo";
import { HttpError } from "../../helpers/errors";

const index = async (ctx: Context) => {
    const { id } = ctx.request.query || {};
    if (id) {
        try {
            const user = await usersRepo.find(ctx.db, id as string);
            ctx.body = user;
        } catch (e: any) {
            console.log(e);
            if (e instanceof HttpError) {
                ctx.status = e.status;
                ctx.body = { message: e.message, name: e.name, stack: e.stack };
                return;
            } else {
                ctx.status = 500;
                ctx.body = {
                    message: e.message,
                    name: "Unknown Error",
                    stack: e.stack,
                };
                return;
            }
        }
        return;
    }
    const users = await usersRepo.finds(ctx.db);
    ctx.body = users;
};

const save = (ctx: Context) => {};
const update = (ctx: Context) => {};
const destroy = (ctx: Context) => {};

const handlers = { index, save, update, destroy };

export default handlers;
