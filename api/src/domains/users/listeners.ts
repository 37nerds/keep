import { TUser } from "@domains/users/repository";
import { USERS_LOGIN } from "./events";

import emitter from "@base/emitter";
import { addEmail } from "@base/queue";

emitter().on(USERS_LOGIN, (user: TUser) => {
    addEmail({ to: user.email, subject: "Login Alert", template: "login_alert.ejs", data: user });
});
