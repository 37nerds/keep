import type { Job } from "bullmq";
import type { TUser } from "@domains/users/repository";

import sendMail from "@helpers/mailer";
import { render } from "@helpers/units";
import { templates } from "@base/cache";

export default async (job: Job<TUser & { ip: string; userAgent: string }>) => {
    const params = job.data;
    const content = render(templates()["login_alert.ejs"], params);
    const res = await sendMail(params.email, "Login Alert - 37nerds/keep", content);
    console.log(res);
};
