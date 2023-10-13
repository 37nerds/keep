import type { TUpdateUserQuery, TInsertUserBody, TUpdateUserBody, TDeleteUserQuery } from "./schemas";

import { postUserSchema, patchUserSchema, TGetUserQuery, getUserSchema, deleteUserSchema } from "./schemas";

import Router from "@koa/router";
import Koa from "koa";
import eh from "@base/error_handler";
import validate from "@middlewares/validate";
import handlers from "./handlers";

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.get("/", validate<TGetUserQuery, null>(getUserSchema), eh(handlers.index));
    router.post("/", validate<null, TInsertUserBody>(postUserSchema), eh(handlers.save));
    router.patch("/", validate<TUpdateUserQuery, TUpdateUserBody>(patchUserSchema), eh(handlers.update));
    router.delete("/", validate<TDeleteUserQuery, null>(deleteUserSchema), eh(handlers.destroy));

    app.use(router.routes());
    app.use(router.allowedMethods());
};
