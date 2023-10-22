import type { Db } from "mongodb";
import { MongoClient } from "mongodb";
import env from "@configs/env";

const connect = async (): Promise<Db> => {
    const client = new MongoClient(env.MONGO_URI);
    await client.connect();
    console.log("Connected successfully to mongodb");
    return client.db();
};

let db: Db;

const mongodb = async () => {
    if (!db) {
        db = await connect();
    }
    return db;
};

export default mongodb;
