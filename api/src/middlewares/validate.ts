import type { Context, Next } from "koa";

import { z } from "zod";
import { UnknownError, ValidationError } from "@base/errors";
import { TSchema } from "@base/types";
import eh from "@base/error_handler";

const validate = <T, T2>(schema: TSchema) => {
    return eh((ctx: Context, next: Next) => {
        try {
            if (schema.body) {
                ctx.request.body = schema.body.parse(ctx.request.body) as T2;
            }
            if (schema.query) {
                ctx.request.query = schema.query.parse(ctx.request.query as T)
            }
            return next();
        } catch (e: any) {
            if (e instanceof z.ZodError) {
                throw new ValidationError("Payload is invalid", e.message);
            } else {
                throw new UnknownError(e?.message || "");
            }
        }
    });
};

export default validate;
