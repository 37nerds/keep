import type { TSchema } from "@base/types";

import { z } from "zod";

const userStatusSchema = z.enum(["active", "inactive"]);

const postUserBodySchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
    status: userStatusSchema.optional(),
});

const patchUpdateBodySchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    status: userStatusSchema.optional(),
});

const idSchema = z.string().length(24);

const patchUpdateQuerySchema = z.object({
    id: idSchema,
});

const getUserQuerySchema = z.object({
    id: idSchema.optional(),
});

export const postUserSchema: TSchema = {
    body: postUserBodySchema,
};

export const patchUserSchema: TSchema = {
    body: patchUpdateBodySchema,
    query: patchUpdateQuerySchema,
};

export const getUserSchema: TSchema = {
    query: getUserQuerySchema,
};

export const deleteUserSchema: TSchema = {
    query: patchUpdateQuerySchema,
};

export type TUserStatus = z.infer<typeof userStatusSchema>;
export type TInsertUserBody = z.infer<typeof postUserBodySchema>;
export type TUpdateUserBody = z.infer<typeof patchUpdateBodySchema>;
export type TUpdateUserQuery = z.infer<typeof patchUpdateQuerySchema>;
export type TGetUserQuery = z.infer<typeof getUserQuerySchema>;
export type TDeleteUserQuery = z.infer<typeof patchUpdateQuerySchema>;
