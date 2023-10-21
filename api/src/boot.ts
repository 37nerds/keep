import type { Db } from "mongodb";
import type { TUser } from "@domains/users/schemas";

import koaLogger from "koa-logger";
import koaJson from "koa-json";
import koaCors from "@koa/cors";
import koaBodyparser from "@koa/bodyparser";
import koaStatic from "koa-static";
import koaMount from "koa-mount";
import mongodb from "@base/mongodb";
import requestId from "@middlewares/request_id";
import domains from "@configs/domains";

import Koa from "koa";

declare module "koa" {
    interface Context {
        db: Db;
        user: TUser;
    }
}

const loadMiddlewares = async (app: Koa) => {
    app.use(requestId());
    app.use(koaBodyparser());
    app.use(
        koaCors({
            credentials: true,
        }),
    );
    app.use(koaLogger());
    app.use(koaJson());
    app.use(koaMount("/public", koaStatic("./public")));
};

const loadDomains = async (app: Koa) => {
    for (const domain of domains) {
        const fileName = `./domains/${domain}/index`;
        try {
            const domainModule = await import(fileName);
            domainModule.default(app);
        } catch (error) {
            console.error(`Error importing module for '${fileName}':`, error);
        }
    }
};

const boot = async () => {
    const app = new Koa();

    await loadMiddlewares(app);
    app.context.db = await mongodb();
    await loadDomains(app);

    return app;
};

export default boot;
