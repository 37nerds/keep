import { api_base_url } from "@/config/env";

const http = {
    post: async (endpoint: string, body: object, happy: number) => {
        console.log("here", body);

        const response = await fetch(api_base_url + endpoint, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include", // Include cookies in the request
        });
        const payload = await response.json();
        if (happy !== response.status) {
            throw payload;
        }
        return payload;
    },
};

export default http;
