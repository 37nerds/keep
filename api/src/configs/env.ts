import type { TNodeEnv } from "@base/types";
import "dotenv/config";

type TEnv = {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: TNodeEnv;
    JWT_SECRET_KEY: string;
    CRYPTO_SALT_ROUNDS: number;

    REDIS_HOSTNAME: string;
    REDIS_PORT: number;

    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASSWORD: string;
};

 const loadEnv = (name: string, defaultValue: string = ""): string => {
    return process.env[name] || defaultValue;
};

const env: TEnv = {
    PORT: Number(loadEnv("PORT", "8000")),
    MONGO_URI: loadEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
    NODE_ENV: loadEnv("NODE_ENV", "prod") as TNodeEnv,
    JWT_SECRET_KEY: loadEnv("JWT_SECRET_KEY", ""),
    CRYPTO_SALT_ROUNDS: Number(loadEnv("CRYPTO_SALT_ROUNDS")),

    REDIS_HOSTNAME: loadEnv("REDIS_HOSTNAME", "127.0.0.1"),
    REDIS_PORT: Number(loadEnv("REDIS_PORT", "6379")),

    SMTP_HOST: loadEnv("SMTP_HOST", ""),
    SMTP_PORT: Number(loadEnv("SMTP_PORT", "")),
    SMTP_USERNAME: loadEnv("SMTP_USERNAME", ""),
    SMTP_PASSWORD: loadEnv("SMTP_PASSWORD", ""),
};

export default env;
