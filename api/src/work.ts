import worker from "@base/worker";
import Koa from "koa";
import Router from "@koa/router";
import koaCors from "@koa/cors";
import log from "@helpers/log";

worker().then(() => {
    const app = new Koa();
    const router = new Router();

    app.use(
        koaCors({
            credentials: true,
        }),
    );
    router.get("/health", () => {
        return "ok";
    });
    app.use(router.routes());
    app.use(router.allowedMethods());

    app.listen(9000, () => {
        log.boot("worker expose a port as well: 9000");
    });
    log.boot("worker is running...");
});
