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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: 100, //numbers of requests
    duration: 60 //Per second
});
const rateLimiterMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rateLimiter.consume(req.ip || 'unkown');
        console.log(`Rate Limit check passed for IP: ${req.ip})`);
        next();
    }
    catch (error) {
        res.status(429).json({ error: "Too many request, please try again later." });
    }
});
exports.rateLimiterMiddleware = rateLimiterMiddleware;
