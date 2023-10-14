import type { TStatus } from "@base/types";
import type { Context } from "koa";

export const reply = (ctx: Context, status: TStatus, body?: object) => {
    ctx.status = status;
    ctx.body = body;
};
