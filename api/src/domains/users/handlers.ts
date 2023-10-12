import { Context } from "koa";
import { z } from "zod";
import { HttpError } from "../../helpers/errors";
import usersRepo from "./repo";

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

const save = async (ctx: Context) => {
    const userSchema = z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
    });

    try {
        const payload = userSchema.parse(ctx.request.body);
        const user = await usersRepo.insert(ctx.db, payload);
        ctx.body = user;
        return;
    } catch (error) {
        if (error instanceof z.ZodError) {
            ctx.status = 400;
            ctx.body = {
                error: "Validation error",
                details: error.errors,
            };
            return;
        }

        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
        return;
    }
};

const update = (ctx: Context) => {};
const destroy = (ctx: Context) => {};

const handlers = { index, save, update, destroy };

export default handlers;
