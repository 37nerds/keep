import env from "@configs/env";

export const loadEnv = (name: string, defaultValue: string): string => {
    return process.env[name] || defaultValue;
};

export const isDev = () => {
    return env.NODE_ENV === "dev";
};
