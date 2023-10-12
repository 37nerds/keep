import { Context } from "koa";
import { HttpError, UnknownError } from "./errors";

const eh = <T>(func: (ctx: Context) => Promise<T>) => {
    return async (ctx: Context) => {
        try {
            return func(ctx);
        } catch (e: any) {
            console.log("here3", e);
            let error = e;
            if (!(e instanceof HttpError)) {
                error = new UnknownError(e?.message || "");
            }
            ctx.status = error.status;
            ctx.body = {
                message: error.message,
                name: error.name,
                stack: error.stack,
            };
        }
    };
};

export default eh;
