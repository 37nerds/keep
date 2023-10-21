import * as uuid from "uuid";

import type { Context, Next } from "koa";

const X_REQUEST_ID = "X-Request-Id";

export const getRequestId = (ctx: Context): string => {
    return ctx.response.get(X_REQUEST_ID) || "";
};

const requestId = () => async (ctx: Context, next: Next) => {
    const requestId = uuid.v4();
    ctx.response.set(X_REQUEST_ID, requestId);
    return await next();
};

export default requestId;
