import { ObjectId } from "mongodb";
import { z } from "zod";

export const registerUserBodySchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
});

const userStatusSchema = z.enum(["active", "inactive"]);

export const loginUserBodySchema = z
    .object({
        username: z.string().optional(),
        email: z.string().optional(),
        password: z.string(),
    })
    .refine((data) => data.username || data.email, {
        message: "Either 'username' or 'email' is required.",
    });

export const postUserBodySchema = registerUserBodySchema.merge(
    z.object({
        status: userStatusSchema.optional(),
    }),
);

export const updateBodySchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    status: userStatusSchema.optional(),
});

export const idSchema = z.string().length(24);

export const updateQuerySchema = z.object({
    id: idSchema,
});

export const getUserQuerySchema = z.object({
    id: idSchema.optional(),
});

export type TInsertUserBody = z.infer<typeof postUserBodySchema>;
export type TUpdateUserBody = z.infer<typeof updateBodySchema>;
export type TUpdateUserQuery = z.infer<typeof updateQuerySchema>;
export type TGetUserQuery = z.infer<typeof getUserQuerySchema>;
export type TDeleteUserQuery = z.infer<typeof updateQuerySchema>;
export type TLoginUserBody = z.infer<typeof loginUserBodySchema>;
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

export const userResponse = (user: TUser): TUserResponse => {
    return { ...user, password: undefined } as TUserResponse;
};
