import type { Job } from "bullmq";
import type { TUser } from "@domains/users/repository";

import { render } from "@helpers/units";
import { templates } from "@base/cache";

import useragent from "useragent";
import sendMail from "@helpers/mailer";
import log from "@helpers/log";

export default async (job: Job<TUser & { ip: string; userAgent: string }>) => {
    const content = render(templates()["login_alert.email.ejs"], {
        ...job.data,
        userAgent: useragent.lookup(job.data.userAgent).toString(),
        location: null,
    });
    const res = await sendMail(job.data.email, "Login Alert - 37nerds/keep", content);
    log.info(res);
};
