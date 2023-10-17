import type { Context, Next } from "koa";
import * as uuid from "uuid";

const generateRequestId = () => async (ctx: Context, next: Next) => {
    const requestId = uuid.v4();
    ctx.request.id = requestId;
    ctx.response.set("X-Request-Id", requestId);
    return await next();
};

export default generateRequestId;
