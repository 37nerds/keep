import type { JwtPayload } from "jsonwebtoken";

import env from "@/configs/env";
import jsonwebtoken from "jsonwebtoken";

const secretKey = env.JWT_SECRET_KEY;

const jwt = {
    generate: async (payload: object, expiresInHours: number = 1): Promise<string> => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(
                payload,
                secretKey,
                { expiresIn: `${expiresInHours}h` },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    if (!token) {
                        return reject(new Error("token is undefined"));
                    }
                    return resolve(token);
                },
            );
        });
    },
    verify: async (token: string): Promise<JwtPayload | string> => {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, secretKey, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                if (!decoded) {
                    return reject(new Error("decoded value is undefined"));
                }
                return resolve(decoded);
            });
        });
    },
};

export default jwt;
