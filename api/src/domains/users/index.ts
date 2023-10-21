import "./listeners";
import {
    registerUserBodySchema,
    loginUserBodySchema,
    getUserQuerySchema,
    postUserBodySchema,
    updateBodySchema,
    updateQuerySchema,
} from "./schemas";

import {
    changePassword,
    destroy,
    forgotPassword,
    index,
    login,
    logout,
    profile,
    register,
    resetPassword,
    save,
    update,
} from "./handlers";

import Router from "@koa/router";
import Koa from "koa";
import eh from "@base/error_handler";
import validate from "@middlewares/validate";
import protect from "@middlewares/protect";

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.post("/register", validate(null, registerUserBodySchema), eh(register));
    router.post("/login", validate(null, loginUserBodySchema), eh(login));

    router.get("/profile", protect(), eh(profile));
    router.delete("/logout", protect(), eh(logout));

    router.post("/forgot-password", eh(forgotPassword));
    router.post("/reset-password", eh(resetPassword));
    router.post("/change-password", eh(changePassword));

    router.get("/", validate(getUserQuerySchema, null), eh(index));
    router.post("/", validate(null, postUserBodySchema), eh(save));
    router.patch("/", validate(updateQuerySchema, updateBodySchema), eh(update));
    router.delete("/", validate(updateQuerySchema, null), eh(destroy));

    app.use(router.routes());
    app.use(router.allowedMethods());
};
