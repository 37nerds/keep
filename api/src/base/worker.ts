import type { Job } from "bullmq";

import { templates } from "@/base/cache";
import { Worker } from "bullmq";
import { QUEUE } from "./queue";
import { loadDynamically } from "@/helpers/units";
import { colors } from "@/helpers/log";

import env from "@/configs/env";
import log from "@/helpers/log";

const handler = async (job: Job) => {
    await log.time(`${colors.cyan(job.id)} ${colors.yellow(job.name)}`, async () => {
        const m = await loadDynamically(`../jobs/${job.name}`);
        await m.default(job);
    });
};

const worker = async () => {
    templates();
    const w = new Worker(QUEUE, handler, {
        connection: { host: env.REDIS_HOSTNAME, port: env.REDIS_PORT },
    });
    w.on("failed", (job, err) => {
        log.info(`(${job?.id}) (${job?.name}) has failed with ${err.message}`);
    });
};

export default worker;
