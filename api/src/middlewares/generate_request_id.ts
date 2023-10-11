import type { Context, Next } from "koa";
import * as uuid from "uuid";

const generateRequestId = () => async (ctx: Context, next: Next) => {
    ctx.request.id = uuid.v4();
    return await next();
};

export default generateRequestId;
