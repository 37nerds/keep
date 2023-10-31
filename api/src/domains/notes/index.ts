import Router from "@koa/router";
import Koa from "koa";

export default (app: Koa) => {
    const r = new Router({ prefix: "/v1/notes" });

    app.use(r.routes());
    app.use(r.allowedMethods());
};
