import emitter from "@base/emitter";
import { USERS_LOGIN } from "./events";
import { TUser } from "./schemas";

emitter().on(USERS_LOGIN, (user: TUser) => {
    console.log("Logged user: ", user);
});
