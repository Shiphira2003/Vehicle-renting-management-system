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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("./auth.service");
const googleMailer_1 = require("../middleware/googleMailer");
//Register Login
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        if (!user.firstName || !user.lastName || !user.email || !user.password) {
            res.status(400).json({ error: "All fields are required" });
            return; // Prevent further execution
        }
        const existingUser = yield (0, auth_service_1.getUserByEmailService)(user.email);
        if (existingUser) {
            res.status(404).json({ message: "Email already taken😒" });
            return;
        }
        //generate hashed password
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = bcrypt_1.default.hashSync(user.password, salt);
        user.password = hashedPassword;
        const newUser = yield (0, auth_service_1.createUserServices)(user);
        const result = yield (0, googleMailer_1.sendNotificationEmail)(user.email, user.fullName, "Account created Successfully", "Welcome to our Food Service");
        res.status(201).json({ message: newUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create user" });
    }
});
exports.createUser = createUser;
//Login
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const existingUser = yield (0, auth_service_1.getUserByEmailService)(user.email);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        else {
            //Compare password
            const isMatch = bcrypt_1.default.compareSync(user.password, existingUser.password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid Credentials" });
                return;
            }
            //Generate Token
            let payload = {
                userId: existingUser.userId,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                role: existingUser.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 60) /// token expire 1hr
            };
            let secret = process.env.JWT_SECRET;
            // console.log (payload)
            const token = jsonwebtoken_1.default.sign(payload, secret);
            res.status(200).json({ token, userId: existingUser.userId, email: existingUser.email, firstName: existingUser.firstName, lastName: existingUser.lastName, role: existingUser.role });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Failed to login" });
    }
});
exports.loginUser = loginUser;
