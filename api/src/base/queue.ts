import { Queue } from "bullmq";

import env from "@configs/env";

export const QUEUE = "keep-queue";

const q = new Queue(QUEUE, {
    connection: {
        host: env.REDIS_HOSTNAME,
        port: env.REDIS_PORT,
    },
});

const queue = async (name: string, params: object) => {
    await q.add(name, params);
};

export default queue;
