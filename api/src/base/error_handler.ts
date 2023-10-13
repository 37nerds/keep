import { Context, Next } from "koa";
import { HttpError, UnknownError } from "./errors";

const eh = <T>(func: (ctx: Context, next: Next) => Promise<T>) => {
    return async (ctx: Context, next: Next) => {
        try {
            return await func(ctx, next);
        } catch (e: any) {
            let error = e;
            if (!(e instanceof HttpError)) {
                error = new UnknownError(e?.message || "");
            }
            ctx.status = error.status;
            ctx.body = {
                name: error.name,
                message: error.message,
                // errors: error?.errors ? JSON.parse(error.errors) : null,
                stack: error.stack,
            };
        }
    };
};

export default eh;
