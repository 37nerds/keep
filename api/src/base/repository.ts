import type { Filter, OptionalId, Document, WithId } from "mongodb";

import { DatabaseError, NotFoundError, ProcessingError } from "@/helpers/errors";
import { ObjectId } from "mongodb";
import { db } from "@/base/cache";

export type TDocBase = {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

const toObjectId = (_id: string): ObjectId => {
    try {
        return new ObjectId(_id);
    } catch (e: any) {
        throw new ProcessingError(e.message);
    }
};

const getCollection = async (collection: string) => {
    return (await db()).collection(collection);
};

const finds = async <T>(collection: string, shallow: boolean = false): Promise<T[]> => {
    const c = await getCollection(collection);
    let filter = {};
    if (shallow) {
        filter = {
            ...filter,
            ...{
                deletedAt: { $eq: null },
            },
        };
    }
    const items = await c.find(filter).toArray();
    return items as T[];
};

const find = async <T>(
    collection: string,
    filterOrId: string | Filter<Document>,
    shallow: boolean = false,
): Promise<T> => {
    const c = await getCollection(collection);
    let item: WithId<Document> | null;
    if (typeof filterOrId === "string") {
        item = await c.findOne({ _id: toObjectId(filterOrId) });
    } else {
        item = await c.findOne(filterOrId);
    }
    if (!item) {
        throw new NotFoundError(`item not found in '${collection}' collection`);
    }
    if (shallow) {
        if (item.deletedAt !== null) {
            throw new NotFoundError(`item not found in '${collection}' collection`);
        }
    }
    return item as T;
};

const insert = async <T, T2>(collection: string, doc: T): Promise<T2> => {
    const c = await getCollection(collection);
    doc = { ...doc, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
    const r = await c.insertOne(doc as OptionalId<T>);
    const saveDoc = await c.findOne({
        _id: r.insertedId,
    });
    if (!saveDoc) {
        throw new NotFoundError(`item not found in '${collection}' collection`);
    }
    return saveDoc as T2;
};

const update = async <T, T2>(collection: string, _id: string, doc: T): Promise<T2> => {
    const c = await getCollection(collection);
    doc = { ...doc, updatedAt: new Date() };
    const r = await c.updateOne({ _id: toObjectId(_id) }, { $set: doc });
    if (r.matchedCount === 0) {
        throw new DatabaseError(`failed to update item in '${collection}' collection`);
    }
    return find<T2>(collection, _id);
};

const destroy = async (
    collection: string,
    _id: string,
    shallow: boolean = false,
): Promise<void> => {
    const c = await getCollection(collection);
    const id = toObjectId(_id);
    const item = await c.findOne({ _id: id });
    if (!item) {
        throw new NotFoundError(`item not found in '${collection}' collection`);
    }
    if (shallow) {
        if (item.deletedAt !== null) {
            throw new NotFoundError(`item not found in '${collection}' collection`);
        }
        const r = await c.updateOne({ _id: id }, { $set: { deletedAt: new Date() } });
        if (r.matchedCount === 0) {
            throw new DatabaseError(`failed to update item in '${collection}' collection`);
        }
        return;
    }
    const r = await c.deleteOne({ _id: id });
    if (r.deletedCount !== 1) {
        throw new DatabaseError(`failed to delete item in '${collection}' collection`);
    }
};

const repository = { insert, update, find, finds, destroy };

export default repository;
