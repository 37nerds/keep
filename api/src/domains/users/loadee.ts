import Koa from "koa";
import Router from "@koa/router";
import handlers from "./handlers";

export default (app: Koa) => {
    const router = new Router({
        prefix: "/api/v1/users",
    });

    router.get("/", handlers.index);
    router.post("/", handlers.save);
    router.patch("/", handlers.update);
    router.delete("/", handlers.destroy);

    app.use(router.routes());
    app.use(router.allowedMethods());
};
