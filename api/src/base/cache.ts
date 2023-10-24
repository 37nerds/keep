import type { Db } from "mongodb";

import { EventEmitter } from "node:events";
import { loadTemplates } from "@helpers/units";
import { connectMongodb } from "@helpers/units";

import path from "node:path";

let _templates: { [key: string]: string };
let _db: Db;
let _emitter: EventEmitter;

export const db = async () => {
    if (!_db) {
        _db = await connectMongodb();
        console.log("connected successfully to mongodb");
    }
    return _db;
};

export const emitter = () => {
    if (!_emitter) {
        _emitter = new EventEmitter();
        console.log("emitter created");
    }
    return _emitter;
};

export const templates = () => {
    if (!_templates) {
        _templates = loadTemplates(path.join(__dirname, "..", "..", "tmpl"));
        console.log("templates loaded");
    }
    return _templates;
};
