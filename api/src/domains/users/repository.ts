import type { TInsertUserBody, TUpdateUserBody } from "./schemas";
import type { Db } from "mongodb";

import { ObjectId } from "mongodb";

import repository from "@base/repository";

export type TUser = TInsertUserBody & {
    _id: ObjectId;
};

export const USERS = "users";

const finds = async (db: Db): Promise<TUser[]> => {
    return repository.finds<TUser>(db, USERS);
};

const find = async (db: Db, userId: string): Promise<TUser> => {
    return repository.find<TUser>(db, USERS, userId);
};

const insert = async (db: Db, doc: TInsertUserBody): Promise<TUser> => {
    return repository.insert<TInsertUserBody, TUser>(db, USERS, doc);
};

const update = async (db: Db, userId: string, doc: TUpdateUserBody): Promise<TUser | null> => {
    return repository.update<TUpdateUserBody, TUser>(db, USERS, userId, doc);
};

const destroy = async (db: Db, userId: string): Promise<void> => {
    return repository.destroy(db, USERS, userId);
};

const usersRepo = { insert, update, find, finds, destroy };

export default usersRepo;
