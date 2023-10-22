import "./templates";

import { Job, Worker } from "bullmq";
import { QUEUE } from "./queue";
import { loadDynamically } from "@helpers/mod";

import env from "@configs/env";

const gray = (v: string) => `\x1b[90m${v}\x1b[0m`; // Gray color

const handler = async (job: Job) => {
    const startTime = new Date().getTime();
    const idPart = `\x1b[36m${job.id}\x1b[0m`; // Cyan color
    const namePart = `\x1b[33m${job.name}\x1b[0m`; // Yellow color

    console.log(`  ${gray("<--")} ${idPart} ${namePart}`);

    const m = await loadDynamically(`../jobs/${job.name}`);
    await m.default(job);

    const time = new Date().getTime() - startTime;
    console.log(`  ${gray("-->")} ${idPart} ${namePart} \x1b[32m${time}ms\x1b[0m`); // Green color for time
};

const worker = async () => {
    const w = new Worker(QUEUE, handler, {
        connection: { host: env.REDIS_HOSTNAME, port: env.REDIS_PORT },
    });

    console.log("worker is running...");

    w.on("failed", (job, err) => {
        console.log(`>-- (${job?.id}) (${job?.name}) has failed with ${err.message}`);
    });
};

export default worker;
