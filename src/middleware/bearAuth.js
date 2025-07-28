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
exports.bothRoleAuth = exports.memberRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//AUTHENTICATION MIDDLEWARE
const verifyToken = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
});
exports.verifyToken = verifyToken;
//AUTHORIZATION MIDDLEWARE
const authMiddleware = (req, res, requiredRoles) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ error: "Authorization header is missing" });
        return;
    }
    const decodedToken = yield (0, exports.verifyToken)(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        res.status(401).json({ error: "Ivalid or expired token" });
    }
    const role = decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role;
    if (requiredRoles === "both" && (role === "admin" || role === "member")) {
        if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === "admin" || (decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.role) === "member") {
            req.user === decodedToken;
            return;
        }
    }
    else if (role === requiredRoles) {
        req.user === decodedToken;
        return;
    }
    else {
        res.status(403).json({ error: "Forbidden: You do not have permission to access this resource" });
    }
});
exports.authMiddleware = authMiddleware;
//Middleware to check if the user is admin
const adminRoleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, exports.authMiddleware)(req, res, "admin"); });
exports.adminRoleAuth = adminRoleAuth;
const memberRoleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, exports.authMiddleware)(req, res, "member"); });
exports.memberRoleAuth = memberRoleAuth;
const bothRoleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, exports.authMiddleware)(req, res, "both"); });
exports.bothRoleAuth = bothRoleAuth;
