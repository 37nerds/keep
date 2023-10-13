import "dotenv/config";

import { loadEnv } from "@helpers/config";

type TNodeEnv = "dev" | "prod";

type TEnv = {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: TNodeEnv;
};

const env: TEnv = {
    PORT: Number(loadEnv("PORT", "8000")),
    MONGO_URI: loadEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
    NODE_ENV: loadEnv("NODE_ENV", "prod") as TNodeEnv,
};

export default env;
