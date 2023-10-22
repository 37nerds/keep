import type { Job } from "bullmq";
import templates, { render } from "@base/templates";
import sendMail from "@base/mailer";
import { TUser } from "@domains/users/repository";

export default async (job: Job<TUser & { ip: string }>) => {
    const params = job.data;
    const content = render(templates["login_alert.ejs"], params);
    const res = await sendMail(params.email, "Login Alert - 37nerds/keep", content);
    console.log(res);
};
