import type { TInsertUser, TUpdateUser } from "./schemas";
import type { Db } from "mongodb";

import { ObjectId } from "mongodb";

import repository from "@base/repository";

export type TUser = TInsertUser & {
    _id: ObjectId;
};

export const USERS = "users";

const finds = async (db: Db): Promise<TUser[]> => {
    return repository.finds<TUser>(db, USERS);
};

const find = async (db: Db, userId: string): Promise<TUser> => {
    return repository.find<TUser>(db, USERS, userId);
};

const insert = async (db: Db, doc: TInsertUser): Promise<TUser> => {
    return repository.insert<TInsertUser, TUser>(db, USERS, doc);
};

const update = async (
    db: Db,
    userId: string,
    doc: TUpdateUser,
): Promise<TUser | null> => {
    return repository.update<TUpdateUser, TUser>(db, USERS, userId, doc);
};

const destroy = async (db: Db, userId: string): Promise<void> => {
    return repository.destroy(db, USERS, userId);
};

const usersRepo = { insert, update, find, finds, destroy };

export default usersRepo;
