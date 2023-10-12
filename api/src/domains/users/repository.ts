import { NotFoundError, ServerSideError } from "../../helpers/errors";
import { Db, ObjectId } from "mongodb";
import { TInsertUser, TUpdateUser } from "./requests";

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
        return null;
    }
    return saveDoc as TUser;
};

const update = async (
    db: Db,
    userId: ObjectId,
    doc: TUpdateUser,
): Promise<TUser | null> => {
    const usersCollection = db.collection("users");
    const result = await usersCollection.updateOne(
        { _id: userId },
        { $set: doc },
    );
    if (result.matchedCount === 0) {
        return null;
    }
    const updatedDoc = await usersCollection.findOne({ _id: userId });
    if (!updatedDoc) {
        return null;
    }
    return updatedDoc as TUser;
};

const destroy = async (db: Db, userId: ObjectId): Promise<boolean> => {
    const usersCollection = db.collection("users");
    const result = await usersCollection.deleteOne({ _id: userId });
    return result.deletedCount === 1;
};

const usersRepo = { insert, update, find, finds, destroy };

export default usersRepo;
