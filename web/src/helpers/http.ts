import env from "@/config/env";

export type TMethod = "GET" | "POST" | "PATCH" | "DELETE";

const http = {
    json: async (endpoint: string, method: TMethod, body: object | null, happy: number) => {
        const response = await fetch(env.API_BASE_URL + endpoint, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include",
        });
        const payload = response.status === 204 ? {} : await response.json();
        if (happy !== response.status) {
            throw payload;
        }
        return payload;
    },
    get: (endpoint: string, happy: number) => {
        return http.json(endpoint, "GET", null, happy);
    },
    post: (endpoint: string, body: object, happy: number) => {
        return http.json(endpoint, "POST", body, happy);
    },
    delete: (endpoint: string, happy: number) => {
        return http.json(endpoint, "DELETE", null, happy);
    },
};

export default http;
