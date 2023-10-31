import { verifyAuthToken } from "@/domains/users/logic";
import { Context, Next } from "koa";

import eh from "@/base/eh";

const protect = () => {
    return eh(async (ctx: Context, next: Next) => {
        ctx.user = await verifyAuthToken(ctx);
        return await next();
    });
};

export default protect;
