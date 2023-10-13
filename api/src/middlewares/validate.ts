import type { Schema } from "zod";
import type { Context, Next } from "koa";

import { z } from "zod";
import { UnknownError, ValidationError } from "../base/errors";

const validate = <T>(schema: Schema<T>) => {
    return (ctx: Context, next: Next) => {
        try {
            ctx.body = schema.parse(ctx.body);
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
