"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateValidator = exports.UserLoginValidator = exports.UserValidator = void 0;
const v4_1 = require("zod/v4");
exports.UserValidator = v4_1.z.object({
    userId: v4_1.z.number().optional(),
    email: v4_1.z.email().trim().nonempty(),
    firstName: v4_1.z.string().min(2).max(100).trim(),
    lastName: v4_1.z.string().min(2).max(100).trim(),
    password: v4_1.z.string().min(4).max(100).trim(),
    contactPhone: v4_1.z.string().nonempty("Phone number is required"),
    address: v4_1.z.string().min(5).max(100).trim(),
    createdAt: v4_1.z.date().optional(),
    updatedAt: v4_1.z.date().optional(),
    role: v4_1.z.enum(["admin", "member"]).optional()
});
exports.UserLoginValidator = v4_1.z.object({
    email: v4_1.z.email().trim(),
    password: v4_1.z.string().min(4).max(100).trim(),
});
exports.UserUpdateValidator = v4_1.z.object({
    userId: v4_1.z.number().optional(),
    email: v4_1.z.string().trim().email().optional(),
    firstName: v4_1.z.string().min(2).max(100).trim().optional(),
    lastName: v4_1.z.string().min(2).max(100).trim().optional(),
    password: v4_1.z.string().min(4).max(100).trim().optional(),
    contactPhone: v4_1.z.string().optional(),
    createdAt: v4_1.z.date().optional(),
    updatedAt: v4_1.z.date().optional(),
    role: v4_1.z.enum(["admin", "member"]).optional(),
}).partial(); // .partial() makes all fields optional for update operations
