import type { TEmailEvent } from "jobs/email";

import { Worker } from "bullmq";
import { EMAIL, QUEUE } from "./queue";

import env from "@configs/env";
import email from "jobs/email";

const worker = async () => {
    const w = new Worker(
        QUEUE,
        async (job) => {
            if (job.name === EMAIL) {
                await email(job.data as TEmailEvent);
            }
        },
        {
            connection: {
                host: env.REDIS_HOSTNAME,
                port: env.REDIS_PORT,
            },
        },
    );

    w.on("completed", (job) => {
        console.log(`${job.id} has completed!`);
    });

    w.on("failed", (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`);
    });
};

export default worker;
