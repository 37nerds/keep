import {
    DatabaseError,
    NotFoundError,
    ServerSideError,
} from "../helpers/errors";

import type { Db, OptionalId } from "mongodb";

import { ObjectId } from "mongodb";

const finds = async <T>(db: Db, collection: string): Promise<T[]> => {
    const c = db.collection(collection);

    const users = await c.find().toArray();

    return users as T[];
};

const find = async <T>(db: Db, collection: string, _id: string): Promise<T> => {
    const c = db.collection("users");

    let id: ObjectId;
    try {
        id = new ObjectId(_id);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const user = await c.findOne({ _id: id });
    if (!user) {
        throw new NotFoundError(`item not found in ${collection}`);
    }

    return user as T;
};

const insert = async <T, T2>(
    db: Db,
    collection: string,
    doc: T,
): Promise<T2> => {
    const c = db.collection(collection);

    const r = await c.insertOne(doc as OptionalId<T>);

    const saveDoc = await c.findOne({
        _id: r.insertedId,
    });
    if (!saveDoc) {
        throw new NotFoundError(`item not found in ${collection}`);
    }

    return saveDoc as T2;
};

const update = async <T, T2>(
    db: Db,
    collection: string,
    _id: string,
    doc: T,
): Promise<T2> => {
    const c = db.collection(collection);

    let id: ObjectId;
    try {
        id = new ObjectId(_id);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const r = await c.updateOne({ _id: id }, { $set: doc });
    if (r.matchedCount === 0) {
        throw new DatabaseError(`failed to update item in ${collection}`);
    }

    const updatedDoc = await c.findOne({ _id: id });
    if (!updatedDoc) {
        throw new NotFoundError(`item not found in ${collection}`);
    }

    return updatedDoc as T2;
};

const destroy = async (
    db: Db,
    collection: string,
    _id: string,
): Promise<void> => {
    const c = db.collection(collection);

    let id: ObjectId;
    try {
        id = new ObjectId(_id);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const r = await c.deleteOne({ _id: id });

    if (r.deletedCount !== 1) {
        throw new DatabaseError(`failed to delete item in ${collection}`);
    }
};

const repository = { insert, update, find, finds, destroy };

export default repository;
