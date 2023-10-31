import env from "@/configs/env";

const formatDuration = (durationInMilliseconds: number) => {
    const milliseconds = durationInMilliseconds % 1000;
    const seconds = Math.floor((durationInMilliseconds / 1000) % 60);
    const minutes = Math.floor((durationInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((durationInMilliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(durationInMilliseconds / (1000 * 60 * 60 * 24));

    const parts = [];

    if (days > 0) {
        parts.push(`${days} day${days === 1 ? "" : "s"}`);
    }
    if (hours > 0) {
        parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
    }
    if (seconds > 0) {
        parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);
    }
    if (milliseconds > 0) {
        parts.push(`${milliseconds} millisecond${milliseconds === 1 ? "" : "s"}`);
    }

    return parts.join(", ");
};

export const colors = {
    gray: (v: string = "") => (v ? `\x1b[90m${v}\x1b[0m` : ""),
    cyan: (v: string = "") => (v ? `\x1b[36m${v}\x1b[0m` : ""),
    yellow: (v: string = "") => (v ? `\x1b[33m${v}\x1b[0m` : ""),
    green: (v: string = "") => (v ? `\x1b[32m${v}\x1b[0m` : ""),
};

const log = {
    log: (...x: any) => console.log(...x),
    debug: (...x: any) => {
        if (env.NODE_ENV === "dev") {
            log.log("[debug]:", ...x);
        }
    },
    boot: (...x: any) => log.log("[boot]", ...x),
    info: (...x: any) => log.log("[info]", ...x),
    time: async (message: string, func: Function) => {
        const startTime = new Date().getTime();
        log.log(`${colors.gray("-->")} '${colors.cyan(message)}'`);
        await func();
        const time = new Date().getTime() - startTime;
        log.log(
            `${colors.gray("<--")} '${colors.cyan(message)}' ${colors.green(formatDuration(time))}`,
        );
    },
};

export default log;
