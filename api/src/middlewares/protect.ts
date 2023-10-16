import { AUTH_TOKEN } from "@domains/users/handlers";
import { TLoginUserBody } from "@domains/users/schemas";
import { Context, Next } from "koa";

import jwt from "@helpers/jwt";
import usersRepo from "@domains/users/repository";
import eh from "@base/error_handler";

const protect = () => {
    return eh(async (ctx: Context, next: Next) => {
        const authToken = ctx.cookies.get(AUTH_TOKEN);
        const decoded = (await jwt.verify(authToken || "")) as TLoginUserBody;
        const user = await usersRepo.find({ email: decoded?.email || "" });
        ctx.user = user;
        return await next();
    });
};

export default protect;
