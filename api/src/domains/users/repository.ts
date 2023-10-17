import type { TInsertUserBody, TUpdateUserBody } from "./schemas";
import type { Db } from "mongodb";

import { ObjectId, Document, Filter } from "mongodb";

import repository from "@base/repository";

export type TUser = TInsertUserBody & {
    _id: ObjectId;
};

export const USERS = "users";

const finds = async (db: Db): Promise<TUser[]> => {
    const users = await repository.finds<TUser>(db, USERS);
    return users;
};

const find = async (filter: Filter<Document>) => {
    return repository.find<TUser>(USERS, filter);
};

const findById = async (userId: string): Promise<TUser> => {
    return repository.find<TUser>(USERS, userId);
};

const insert = async (doc: TInsertUserBody): Promise<TUser> => {
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
