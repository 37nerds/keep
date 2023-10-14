import type { Schema } from "zod";

export type TStatus = 200 | 500 | 400 | 404 | 201 | 204;

export type TSchema = { query?: Schema; body?: Schema };

export type TNodeEnv = "dev" | "prod";
