import type { TInsertUserBody, TUpdateUserBody } from "./schemas";
import type { Db } from "mongodb";

import { Document, Filter, ObjectId } from "mongodb";
import { BadRequestError } from "@base/errors";

import repository from "@base/repository";
import crypto from "@helpers/crypto";

export type TUser = TInsertUserBody & {
    _id: ObjectId;
};

export const USERS = "users";

const finds = async (db: Db): Promise<TUser[]> => {
    return await repository.finds<TUser>(db, USERS);
};

const find = async (filter: Filter<Document>) => {
    return repository.find<TUser>(USERS, filter);
};

const findById = async (userId: string): Promise<TUser> => {
    return repository.find<TUser>(USERS, userId);
};

const insert = async (doc: TInsertUserBody): Promise<TUser> => {
    const { username, email } = doc;
    let user: TUser | null;
    try {
        user = await find({ username });
    } catch (e: any) {
        user = null;
    }
    if (user) {
        throw new BadRequestError("username already exits");
    }
    try {
        user = await find({ email });
    } catch (e: any) {
        user = null;
    }
    if (user) {
        throw new BadRequestError("email already exits");
    }
    doc.password = await crypto.hash(doc.password);
    return repository.insert<TInsertUserBody, TUser>(USERS, doc);
};

const update = async (db: Db, userId: string, doc: TUpdateUserBody): Promise<TUser> => {
    return repository.update<TUpdateUserBody, TUser>(db, USERS, userId, doc);
};

const destroy = async (db: Db, userId: string): Promise<void> => {
    return repository.destroy(db, USERS, userId);
};

const usersRepo = { insert, update, findById, find, finds, destroy };

export default usersRepo;
