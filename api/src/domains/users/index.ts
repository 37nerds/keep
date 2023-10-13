import type { TInsertUser, TUpdateUser } from "./schemas";

import { insertUserSchema, updateUserSchema } from "./schemas";

import Router from "@koa/router";
import Koa from "koa";
import eh from "@base/error_handler";
import validate from "@middlewares/validate";
import handlers from "./handlers";

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.get("/", eh(handlers.index));
    router.post("/", validate<TInsertUser>(insertUserSchema), eh(handlers.save));
    router.patch("/", validate<TUpdateUser>(updateUserSchema), eh(handlers.update));
    router.delete("/", eh(handlers.destroy));

    app.use(router.routes());
    app.use(router.allowedMethods());
};
