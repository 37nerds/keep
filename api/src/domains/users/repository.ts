import type { TInsertUserBody, TUpdateUserBody } from "./schemas";

import { Document, Filter } from "mongodb";
import { BadRequestError } from "@helpers/errors";
import { USERS_CREATED, USERS_DELETED, USERS_FIND, USERS_FINDS, USERS_UPDATED } from "./index";

import repository, { TDocBase } from "@base/repository";
import crypto from "@helpers/crypto";
import { emitter } from "@base/cache";

export type TUser = TInsertUserBody & TDocBase;

export const USERS = "users";

const finds = async (): Promise<TUser[]> => {
    const users = await repository.finds<TUser>(USERS);
    emitter().emit(USERS_FINDS, users);
    return users;
};

const find = async (filter: Filter<Document>) => {
    const user = await repository.find<TUser>(USERS, filter);
    emitter().emit(USERS_FIND, user);
    return user;
};

const findById = async (userId: string): Promise<TUser> => {
    const user = await repository.find<TUser>(USERS, userId);
    emitter().emit(USERS_FIND, user);
    return user;
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
    user = await repository.insert<TInsertUserBody, TUser>(USERS, doc);
    emitter().emit(USERS_CREATED, user);
    return user;
};

const update = async (userId: string, doc: TUpdateUserBody): Promise<TUser> => {
    const user = await repository.update<TUpdateUserBody, TUser>(USERS, userId, doc);
    emitter().emit(USERS_UPDATED, user);
    return user;
};

const destroy = async (userId: string): Promise<void> => {
    await repository.destroy(USERS, userId);
    emitter().emit(USERS_DELETED, userId);
};

const usersRepo = { insert, update, findById, find, finds, destroy };

export default usersRepo;
