"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// === src/app.ts ===
const vehicleSpecification_route_1 = require("./vehicleSpecifications/vehicleSpecification.route");
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const user_route_1 = require("./users/user.route");
const auth_route_1 = require("./auth/auth.route");
const vehicles_route_1 = require("./vehicles/vehicles.route");
const location_route_1 = require("./location/location.route");
const bookings_route_1 = require("./bookings/bookings.route");
const payments_route_1 = require("./payments/payments.route");
const ticket_route_1 = require("./ticket/ticket.route");
const rateLimiter_1 = require("./middleware/rateLimiter");
const cors_1 = __importDefault(require("cors"));
const payments_webhook_1 = require("./payments/payments.webhook");
const app = (0, express_1.default)();
// Stripe requires the raw body for webhook
app.post("/api/webhook", express_1.default.raw({ type: "application/json" }), payments_webhook_1.webhookHandler);
// Basic Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_1.logger);
app.use(rateLimiter_1.rateLimiterMiddleware);
// Default route
app.get('/', (req, res) => {
    res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL");
});
// Import routes
app.use('/api', user_route_1.userRouter);
app.use('/api', vehicleSpecification_route_1.vehicleSpecificationRouter);
app.use('/api', auth_route_1.authRouter);
app.use('/api', vehicles_route_1.vehicleRouter);
app.use('/api', location_route_1.locationRouter);
app.use('/api', bookings_route_1.bookingRouter);
app.use('/api', payments_route_1.paymentRouter);
app.use('/api', ticket_route_1.ticketRouter);
exports.default = app;
