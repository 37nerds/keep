// const le = (n: string, d = ""): string => import.meta.env[n] || d;

type TEnv = {
    API_BASE_URL: string;
};

const env: TEnv = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
};

export default env;
