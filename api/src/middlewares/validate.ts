import type { Context, Next } from "koa";
import type { Schema } from "zod";

import { z } from "zod";
import { UnknownError, ValidationError } from "../base/errors";

const validate = <T>(schema: Schema<T>) => {
    return (ctx: Context, next: Next) => {
        try {
            ctx.request.body = schema.parse(ctx.request.body);
            return next();
        } catch (e: any) {
            if (e instanceof z.ZodError) {
                throw new ValidationError(e.message);
            } else {
                throw new UnknownError(e?.message || "");
            }
        }
    };
};

export default validate;
