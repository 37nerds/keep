import type { TUser } from "@domains/users/repository";

import { USERS_LOGIN } from "./events";

import emitter from "@base/emitter";
import queue from "@base/queue";

emitter().on(USERS_LOGIN, (user: TUser, ip: string) => {
    queue("login_alert", { ...user, ip });
});
