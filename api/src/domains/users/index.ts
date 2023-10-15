import type {
    TUpdateUserQuery,
    TInsertUserBody,
    TUpdateUserBody,
    TDeleteUserQuery,
    TLoginUserBody,
    TRegisterUserBody,
} from "./schemas";

import {
    postUserSchema,
    patchUserSchema,
    TGetUserQuery,
    getUserSchema,
    deleteUserSchema,
    loginUserSchema,
    registerUserSchema,
} from "./schemas";

import {
    changePassword,
    destroy,
    forgotPassword,
    index,
    login,
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

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.post("/register", validate<null, TRegisterUserBody>(registerUserSchema), eh(register));
    router.post("/login", validate<null, TLoginUserBody>(loginUserSchema), eh(login));
    router.post("/forgot-password", eh(forgotPassword));
    router.post("/reset-password", eh(resetPassword));
    router.post("/change-password", eh(changePassword));
    router.get("/profile", eh(profile));

    router.get("/", validate<TGetUserQuery, null>(getUserSchema), eh(index));
    router.post("/", validate<null, TInsertUserBody>(postUserSchema), eh(save));
    router.patch("/", validate<TUpdateUserQuery, TUpdateUserBody>(patchUserSchema), eh(update));
    router.delete("/", validate<TDeleteUserQuery, null>(deleteUserSchema), eh(destroy));

    app.use(router.routes());
    app.use(router.allowedMethods());
};
