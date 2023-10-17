import "dotenv/config";

import { loadEnv } from "@helpers/config";
import { TNodeEnv } from "@base/types";

type TEnv = {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: TNodeEnv;
    JWT_SECRET_KEY: string;
    CRYPTO_SALT_ROUNDS: number;
};

const env: TEnv = {
    PORT: Number(loadEnv("PORT", "8000")),
    MONGO_URI: loadEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
    NODE_ENV: loadEnv("NODE_ENV", "prod") as TNodeEnv,
    JWT_SECRET_KEY: loadEnv("JWT_SECRET_KEY", ""),
    CRYPTO_SALT_ROUNDS: Number(loadEnv("CRYPTO_SALT_ROUNDS")),
};

export default env;
