import { TSchema } from "@base/types";
import { ObjectId } from "mongodb";
import { z } from "zod";

const registerUserBodySchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
});

export const registerUserSchema: TSchema = {
    body: registerUserBodySchema,
};

export type TRegisterUserBody = z.infer<typeof registerUserBodySchema>;

export type TUser = {
    _id: ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    username: string;
    email: string;
    password: string;
    name?: string;
};

export type TUserResponse = {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    name?: string;
};

const userStatusSchema = z.enum(["active", "inactive"]);

const loginUserBodySchema = z
    .object({
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string(),
    })
    .refine((data) => data.username || data.email, {
        message: "Either 'username' or 'email' is required.",
    });

const postUserBodySchema = registerUserBodySchema.merge(
    z.object({
        status: userStatusSchema.optional(),
    }),
);

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

export const loginUserSchema: TSchema = {
    body: loginUserBodySchema,
};

export type TUserStatus = z.infer<typeof userStatusSchema>;
export type TInsertUserBody = z.infer<typeof postUserBodySchema>;
export type TUpdateUserBody = z.infer<typeof patchUpdateBodySchema>;
export type TUpdateUserQuery = z.infer<typeof patchUpdateQuerySchema>;
export type TGetUserQuery = z.infer<typeof getUserQuerySchema>;
export type TDeleteUserQuery = z.infer<typeof patchUpdateQuerySchema>;
export type TLoginUserBody = z.infer<typeof loginUserBodySchema>;
