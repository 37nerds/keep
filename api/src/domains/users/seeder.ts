import type { TInsertUserBody } from "./schemas";
import type { Faker } from "@faker-js/faker";
import type { TUser } from "./repository";

import { USERS } from "./repository";
import { db } from "@base/cache";

import repository from "@base/repository";
import crypto from "@helpers/crypto";

export default async (f: Faker, count: number, deleteBefore: boolean = false) => {
    const c = (await db()).collection(USERS);
    if (deleteBefore) {
        console.log(`removing the ${USERS} collection...`);
        await c.deleteMany();
        console.log(`done`);
    }

    console.log("seeding the users with fake data...");
    if (deleteBefore) {
        await repository.insert<TInsertUserBody, TUser>(USERS, {
            username: "shihab",
            email: "shihab@gmail.com",
            password: await crypto.hash("password"),
            name: "Shihab Mahamud",
        });
    }
    for (let i = 0; i < count - 1; i++) {
        await repository.insert<TInsertUserBody, TUser>(USERS, {
            username: f.internet.userName(),
            email: f.internet.email(),
            password: await crypto.hash("password"),
            name: f.person.fullName(),
        });
    }
    console.log("done");
};
