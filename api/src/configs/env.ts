import "dotenv/config";

const loadEnv = (name: string, defaultValue: string): string => {
    return process.env[name] || defaultValue;
};

const env = {
    PORT: Number(loadEnv("PORT", "8000")),
    MONGO_URI: loadEnv("MONGO_URI", "mongodb://127.0.0.1:27017"),
};

export default env;
