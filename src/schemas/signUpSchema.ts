import {z} from 'zod';

export const usernameValidation= z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(20, "Username must be no more than 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores");
export const signUpSchema= z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
})