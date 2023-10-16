import type { Db } from "mongodb";

import Koa from "koa";
import koaLogger from "koa-logger";
import koaJson from "koa-json";
import koaCors from "@koa/cors";
import koaBodyparser from "@koa/bodyparser";
import koaStatic from "koa-static";
import koaMount from "koa-mount";

import generateRequestId from "@middlewares/generate_request_id";
import mongodb from "@base/mongodb";

declare module "koa" {
    interface Context {
        db: Db;
        request: Request & {
            id: string;
        };
    }
}

const loadMiddlewares = (app: Koa) => {
    app.use(koaBodyparser());
    app.use(
        koaCors({
            credentials: true,
        }),
    );
    app.use(koaLogger());
    app.use(koaJson());
    app.use(koaMount("/public", koaStatic("./public")));
    app.use(generateRequestId());
};

const boot = async (domains: string[]) => {
    const app = new Koa();

    loadMiddlewares(app);

    app.context.db = await mongodb();

    for (const domain of domains) {
        const fileName = `./domains/${domain}/index`;
        try {
            const domainModule = await import(fileName);
            domainModule.default(app);
        } catch (error) {
            console.error(`Error importing module for '${fileName}':`, error);
        }
    }

    return app;
};

export default boot;
