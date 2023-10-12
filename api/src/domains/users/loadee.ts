import Koa from "koa";
import Router from "@koa/router";
import handlers from "./handlers";
import eh from "helpers/error_handler";

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.get("/", eh(handlers.index));
    router.post("/", eh(handlers.save));
    router.patch("/", eh(handlers.update));
    router.delete("/", eh(handlers.destroy));

    app.use(router.routes());
    app.use(router.allowedMethods());
};
