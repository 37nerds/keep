import "dotenv/config";

import type { TNodeEnv } from "@base/types";

import { loadEnv } from "@helpers/config";

type TEnv = {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: TNodeEnv;
    JWT_SECRET_KEY: string;
    CRYPTO_SALT_ROUNDS: number;
    REDIS_HOSTNAME: string;
    REDIS_PORT: number;
};

const env: TEnv = {
    PORT: Number(loadEnv("PORT", "8000")),
    MONGO_URI: loadEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
    NODE_ENV: loadEnv("NODE_ENV", "prod") as TNodeEnv,
    JWT_SECRET_KEY: loadEnv("JWT_SECRET_KEY", ""),
    CRYPTO_SALT_ROUNDS: Number(loadEnv("CRYPTO_SALT_ROUNDS")),
    REDIS_HOSTNAME: loadEnv("REDIS_HOSTNAME", "127.0.0.1"),
    REDIS_PORT: Number(loadEnv("REDIS_PORT", "6379")),
};

export default env;
