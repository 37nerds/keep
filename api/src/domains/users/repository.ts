import {
    DatabaseError,
    NotFoundError,
    ServerSideError,
} from "../../helpers/errors";
import { Db, ObjectId } from "mongodb";
import { TInsertUser, TUpdateUser } from "./requests";
import { warn } from "console";

export type TUser = TInsertUser & {
    _id: ObjectId;
};

const finds = async (db: Db): Promise<TUser[] | null> => {
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().toArray();

    return users as TUser[];
};

const find = async (db: Db, userId: string): Promise<TUser> => {
    const usersCollection = db.collection("users");

    let id: ObjectId;
    try {
        id = new ObjectId(userId);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const user = await usersCollection.findOne({ _id: id });
    if (!user) {
        throw new NotFoundError("user not found");
    }

    return user as TUser;
};

const insert = async (db: Db, doc: TInsertUser): Promise<TUser | null> => {
    const usersCollection = db.collection("users");

    const result = await usersCollection.insertOne(doc);

    const saveDoc = await usersCollection.findOne({
        _id: result.insertedId,
    });
    if (!saveDoc) {
        throw new NotFoundError("user not found");
    }

    return saveDoc as TUser;
};

const update = async (db: Db, doc: TUpdateUser): Promise<TUser | null> => {
    const usersCollection = db.collection("users");

    let id: ObjectId;
    try {
        id = new ObjectId(doc._id);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const result = await usersCollection.updateOne({ _id: id }, { $set: doc });
    if (result.matchedCount === 0) {
        throw new DatabaseError("failed to update user");
    }

    const updatedDoc = await usersCollection.findOne({ _id: id });
    if (!updatedDoc) {
        throw new NotFoundError("user not found");
    }

    return updatedDoc as TUser;
};

const destroy = async (db: Db, userId: string): Promise<void> => {
    const usersCollection = db.collection("users");

    let id: ObjectId;
    try {
        id = new ObjectId(userId);
    } catch (e: any) {
        throw new ServerSideError(e.message);
    }

    const result = await usersCollection.deleteOne({ _id: id });

    if (result.deletedCount !== 1) {
        throw new DatabaseError("failed to delete user");
    }
};

const usersRepo = { insert, update, find, finds, destroy };

export default usersRepo;
