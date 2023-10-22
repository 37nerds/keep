import { loadTemplates, render } from "@helpers/tmpl";
import path from "node:path";

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
    console.log(content);
};

export default email;
