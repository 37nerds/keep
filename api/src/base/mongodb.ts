import env from "@configs/env";
import { Db, MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URI);

const mongodb = async (): Promise<Db> => {
    await client.connect();
    console.log("Connected successfully to mongodb successfully");
    return client.db();
};

export default mongodb;
