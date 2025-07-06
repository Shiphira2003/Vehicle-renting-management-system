import { z } from "zod/v4";

export const UserValidator = z.object({
  userId: z.number().optional(),
  email: z.email().trim().nonempty(),
  firstName: z.string().min(2).max(100).trim(),
  lastName: z.string().min(2).max(100).trim(),
  password: z.string().min(4).max(100).trim(),
  contactPhone: z.string().nonempty("Phone number is required"),
  address:z.string().min(5).max(100).trim(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
 role: z.enum(["admin", "member"]).optional()
});

export const UserLoginValidator = z.object({
  email: z.email().trim(),
  password: z.string().min(4).max(100).trim(),
});
export const UserUpdateValidator = z.object({
  userId: z.number().optional(),
  email: z.string().trim().email().optional(),
  firstName: z.string().min(2).max(100).trim().optional(),
  lastName: z.string().min(2).max(100).trim().optional(),
  password: z.string().min(4).max(100).trim().optional(),
  contactPhone: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  role: z.enum(["admin", "member"]).optional(),
}).partial(); // .partial() makes all fields optional for update operations

