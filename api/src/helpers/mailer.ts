import env from "@/configs/env";
import nodemailer from "nodemailer";
import log from "@/helpers/log";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
    },
});

export const sendMail = (
    to: string,
    subject: string,
    content: string,
    from: string = "hello-keep@37nerds.com",
): Promise<string> => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from,
                to,
                subject,
                html: content,
            },
            (error, info) => {
                if (error) {
                    log.info("error sending email:", error);
                    reject(error);
                } else {
                    log.info("email sent:", info.response);
                    resolve(info.response);
                }
            },
        );
    });
};

export default sendMail;
