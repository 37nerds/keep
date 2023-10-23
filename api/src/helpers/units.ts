import type { TStatus } from "@base/types";
import type { Context } from "koa";
import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import type { Db } from "mongodb";
import { MongoClient } from "mongodb";
import env from "@configs/env";

export const connectMongodb = async (): Promise<Db> => {
    const client = new MongoClient(env.MONGO_URI);
    await client.connect();
    return client.db();
};

export const loadTemplates = (directoryPath: string): { [key: string]: string } => {
    const templates: { [key: string]: string } = {};

    fs.readdirSync(directoryPath).forEach((file) => {
        const templatePath = path.join(directoryPath, file);
        templates[file] = fs.readFileSync(templatePath, "utf-8");
    });

    return templates;
};

export const render = (template: string, params: object) => {
    return ejs.render(template, params);
};

export const reply = (ctx: Context, status: TStatus, body?: object) => {
    ctx.status = status;
    ctx.body = body;
};

export const loadDynamically = async (filepath: string) => {
    try {
        return await import(filepath);
    } catch (error) {
        console.error(`Error importing module for '${filepath}':`, error);
    }
};

export const times = {
    hour: 60 * 60 * 1000,
};



export const isDev = () => {
    return env.NODE_ENV === "dev";
};
