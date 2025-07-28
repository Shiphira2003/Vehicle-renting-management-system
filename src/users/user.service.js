"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserServices = exports.updateUserServices = exports.createUserServices = exports.getUserByIdServices = exports.getUsersServices = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
//CRUD Operations for User entity
//Get all users
const getUsersServices = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.userTable.findMany({
        with: {
            bookings: true,
            supportTickets: true,
        },
        orderBy: [(0, drizzle_orm_1.desc)(schema_1.userTable.userId)]
    });
});
exports.getUsersServices = getUsersServices;
//Get user by ID
const getUserByIdServices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.userTable.findFirst({
        with: {
            bookings: true,
            supportTickets: true,
        },
        where: (0, drizzle_orm_1.eq)(schema_1.userTable.userId, userId)
    });
});
exports.getUserByIdServices = getUserByIdServices;
// Create a new user
const createUserServices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.userTable).values(user).returning();
    return "User Created Successfully 🎉";
});
exports.createUserServices = createUserServices;
// Update an existing user
const updateUserServices = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.userTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.userTable.userId, userId));
    return "User Updated Succeffully 😎";
});
exports.updateUserServices = updateUserServices;
const deleteUserServices = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.userTable).where((0, drizzle_orm_1.eq)(schema_1.userTable.userId, userId));
    return "User Delete Sucessfully  🎉";
});
exports.deleteUserServices = deleteUserServices;
