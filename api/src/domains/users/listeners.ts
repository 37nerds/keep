import type { TUser } from "./schemas";

import { USERS_LOGIN } from "./events";

import emitter from "@base/emitter";

emitter().on(USERS_LOGIN, (user: TUser) => {
    console.log("Logged user: ", user);
});
