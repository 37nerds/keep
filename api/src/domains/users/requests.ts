import { z } from "zod";

export const userStatus = z.enum(["active", "inactive"]);

export const insertUserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string().optional(),
    status: userStatus.optional(),
});

export const updateUserSchema = z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    name: z.string().optional(),
    status: userStatus.optional(),
});

export type TUserStatus = z.infer<typeof userStatus>;
export type TInsertUser = z.infer<typeof insertUserSchema>;
export type TUpdateUser = z.infer<typeof updateUserSchema>;
