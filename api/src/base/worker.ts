import type { Job } from "bullmq";

import { templates } from "@base/cache";
import { Worker } from "bullmq";
import { QUEUE } from "./queue";
import { loadDynamically } from "@helpers/units";

import env from "@configs/env";

const gray = (v: string = "") => (v ? `\x1b[90m${v}\x1b[0m` : "");
const cyan = (v: string = "") => (v ? `\x1b[36m${v}\x1b[0m` : "");
const yellow = (v: string = "") => (v ? `\x1b[33m${v}\x1b[0m` : "");
const green = (v: string = "") => (v ? `\x1b[32m${v}\x1b[0m` : "");

const handler = async (job: Job) => {
    const startTime = new Date().getTime();

    console.log(`${gray("<--")} ${cyan(job.id)} ${yellow(job.name)}`);

    const m = await loadDynamically(`../jobs/${job.name}`);
    await m.default(job);

    const time = new Date().getTime() - startTime;
    console.log(`${gray("-->")} ${cyan(job.id)} ${yellow(job.name)} ${green(`${time}ms`)}`);
};

const worker = async () => {
    templates();
    const w = new Worker(QUEUE, handler, {
        connection: { host: env.REDIS_HOSTNAME, port: env.REDIS_PORT },
    });
    w.on("failed", (job, err) => {
        console.log(`>-- (${job?.id}) (${job?.name}) has failed with ${err.message}`);
    });
};

export default worker;
