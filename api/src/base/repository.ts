import {
    DatabaseError,
    NotFoundError,
    ProcessingError,
    ServerSideError,
} from "../helpers/errors";

import type { Db, OptionalId } from "mongodb";

import { ObjectId } from "mongodb";

const toObjectId = (_id: string): ObjectId => {
    try {
        return new ObjectId(_id);
    } catch (e: any) {
        throw new ProcessingError(e.message);
    }
};

const finds = async <T>(db: Db, collection: string): Promise<T[]> => {
    const c = db.collection(collection);
    const items = await c.find().toArray();
    return items as T[];
};

const find = async <T>(db: Db, collection: string, _id: string): Promise<T> => {
    const c = db.collection(collection);
    const item = await c.findOne({ _id: toObjectId(_id) });
    if (!item) {
        throw new NotFoundError(`item not found in ${collection}`);
    }
    return item as T;
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
    const r = await c.updateOne({ _id: toObjectId(_id) }, { $set: doc });
    if (r.matchedCount === 0) {
        throw new DatabaseError(`failed to update item in ${collection}`);
    }
    return find<T2>(db, collection, _id);
};

const destroy = async (
    db: Db,
    collection: string,
    _id: string,
): Promise<void> => {
    const c = db.collection(collection);
    const r = await c.deleteOne({ _id: toObjectId(_id) });
    if (r.deletedCount !== 1) {
        throw new DatabaseError(`failed to delete item in ${collection}`);
    }
};

const repository = { insert, update, find, finds, destroy };

export default repository;
