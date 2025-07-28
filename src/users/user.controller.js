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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
//Business logic for user-related operations
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield (0, user_service_1.getUsersServices)();
        if (allUsers == null || allUsers.length == 0) {
            res.status(404).json({ message: "No users found" });
        }
        else {
            // Remove password from each user object before sending response
            const usersWithoutPasswords = allUsers.map((_a) => {
                var { password } = _a, user = __rest(_a, ["password"]);
                return user;
            });
            res.status(200).json(usersWithoutPasswords);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const user = yield (0, user_service_1.getUserByIdServices)(userId);
        if (user == undefined) {
            res.status(404).json({ message: "User not found" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch user" });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, contactPhone, address } = req.body;
    if (!firstName || !lastName || !contactPhone || !address || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const newUser = yield (0, user_service_1.createUserServices)({ firstName, lastName, contact: contactPhone, address, email, password });
        if (newUser == null) {
            res.status(500).json({ message: "Failed to create user" });
        }
        else {
            res.status(201).json({ message: newUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create user" });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    const { firstName, lastName, email, password, contactPhone, address } = req.body;
    if (!firstName || !lastName || !email || !password || !contactPhone || !address) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }
    try {
        const updatedUser = yield (0, user_service_1.updateUserServices)(userId, { firstName, lastName, contact: contactPhone, address, email, password });
        if (updatedUser == null) {
            res.status(404).json({ message: "User not found or failed to update" });
        }
        else {
            res.status(200).json({ message: updatedUser });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const deletedUser = yield (0, user_service_1.deleteUserServices)(userId);
        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete user" });
    }
});
exports.deleteUser = deleteUser;
