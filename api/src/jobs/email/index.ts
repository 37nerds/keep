import { loadTemplates, render } from "@helpers/tmpl";
import path from "node:path";
import sendMail from "./mailer";

export type TEmailEvent = {
    from?: string;
    to: string;
    subject: string;
    template: string;
    data: object;
};

const emailTemplatesPath = path.join(__dirname, "..", "..", "tmpls", "emails");
const emailTemplates = loadTemplates(emailTemplatesPath);

const email = async (event: TEmailEvent) => {
    const content = render(emailTemplates[event.template], event.data);
    const res = await sendMail(event.to, event.subject, content, event.from);
    console.log(res);
};

export default email;
