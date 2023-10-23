import type { Db } from "mongodb";

import { EventEmitter } from "node:events";
import { loadTemplates } from "@helpers/units";
import { connectMongodb } from "@helpers/units";

import path from "node:path";

let t: { [key: string]: string };
let d: Db;
let e: EventEmitter;

export const db = async () => {
    if (!d) {
        d = await connectMongodb();
        console.log("connected successfully to mongodb");
    }
    return d;
};

export const emitter = () => {
    if (!e) {
        e = new EventEmitter();
        console.log("emitter created");
    }
    return e;
};

export const templates = () => {
    if (!t) {
        t = loadTemplates(path.join(__dirname, "..", "..", "tmpl"));
        console.log("templates loaded");
    }
    return t;
};
