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
    console.log("here", name);
    const res = await q.add(name, params);
    console.log(res);
};

export default queue;
