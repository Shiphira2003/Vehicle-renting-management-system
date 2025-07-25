// === src/app.ts ===
import { vehicleSpecificationRouter } from './vehicleSpecifications/vehicleSpecification.route';
import express, { Application, Response } from "express";
import { logger } from "./middleware/logger";
import { userRouter } from "./users/user.route";
import { authRouter } from "./auth/auth.route";
import { vehicleRouter } from './vehicles/vehicles.route';
import { locationRouter } from './location/location.route';
import { bookingRouter } from './bookings/bookings.route';
import { paymentRouter } from './payments/payments.route';
import { ticketRouter } from './ticket/ticket.route';
import { rateLimiterMiddleware } from "./middleware/rateLimiter";
import cors from "cors";
import { webhookHandler } from './payments/payments.webhook';

const app: Application = express();

// Stripe requires the raw body for webhook
app.post("/api/webhook", express.raw({ type: "application/json" }), webhookHandler);

// Basic Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(rateLimiterMiddleware);

// Default route
app.get('/', (req, res: Response) => {
  res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL");
});

// Import routes
app.use('/api', userRouter);
app.use('/api', vehicleSpecificationRouter);
app.use('/api', authRouter);
app.use('/api', vehicleRouter);
app.use('/api', locationRouter);
app.use('/api', bookingRouter);
app.use('/api', paymentRouter);
app.use('/api', ticketRouter);

export default app;
