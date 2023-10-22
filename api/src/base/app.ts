import type { TUser } from "@domains/users/repository";

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
        const fileName = `../domains/${domain}/index`;
        try {
            const domainModule = await import(fileName);
            domainModule.default(app);
        } catch (error) {
            console.error(`Error importing module for '${fileName}':`, error);
        }
    }
};

const app = async () => {
    const a = new Koa();

    await loadMiddlewares(a);
    await mongodb();
    await loadDomains(a);

    return a;
};

export default app;
