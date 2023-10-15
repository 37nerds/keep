import env from "@configs/env";
import { Db, MongoClient } from "mongodb";

const connect = async (): Promise<Db> => {
    const client = new MongoClient(env.MONGO_URI);
    await client.connect();
    console.log("Connected successfully to mongodb successfully");
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
