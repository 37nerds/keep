import type { TEmailEvent } from "jobs/email";

import { Queue } from "bullmq";

import env from "@configs/env";

export const QUEUE = "keep-queue";
export const EMAIL = "email";

const queue = new Queue(QUEUE, {
    connection: {
        host: env.REDIS_HOSTNAME,
        port: env.REDIS_PORT,
    },
});

export const addEmail = async (emailEvent: TEmailEvent) => {
    await queue.add(EMAIL, emailEvent);
};

export default queue;
