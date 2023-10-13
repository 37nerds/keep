import type { Schema } from "zod";

export type TStatusCode = 200 | 500 | 400 | 404;

export type TSchema = {
    query?: Schema;
    body?: Schema;
};
