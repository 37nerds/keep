import "dotenv/config";

import type { TNodeEnv } from "@/base/types";

const le = (n: string, d = ""): string => process.env[n] || d;

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

const env: TEnv = {
    PORT: Number(le("PORT", "8000")),
    MONGO_URI: le("MONGO_URI", "mongodb://127.0.0.1:27017/keep"),
    NODE_ENV: le("NODE_ENV", "prod") as TNodeEnv,
    JWT_SECRET_KEY: le("JWT_SECRET_KEY", "simple secret key"),
    CRYPTO_SALT_ROUNDS: Number(le("CRYPTO_SALT_ROUNDS", "10")),

    REDIS_HOSTNAME: le("REDIS_HOSTNAME", "127.0.0.1"),
    REDIS_PORT: Number(le("REDIS_PORT", "6379")),

    SMTP_HOST: le("SMTP_HOST", "sandbox.smtp.mailtrap.io"),
    SMTP_PORT: Number(le("SMTP_PORT", "2525")),
    SMTP_USERNAME: le("SMTP_USERNAME", ""),
    SMTP_PASSWORD: le("SMTP_PASSWORD", ""),
};

export default env;
