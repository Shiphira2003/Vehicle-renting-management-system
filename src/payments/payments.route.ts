import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayments,
  getPaymentById,
  updatePayment,
  getPaymentsByUserId, // ✅ import new controller
} from "../payments/payments.controller";

export const paymentRouter = Router();

// Get all payments
paymentRouter.get("/payments", getPayments);

// ✅ Get all payments for a specific user
paymentRouter.get("/payments/user/:userId", getPaymentsByUserId);

// Get a payment by ID
paymentRouter.get("/payments/:id", getPaymentById);

// Create a new payment
paymentRouter.post("/payments", createPayment);

// Update an existing payment
paymentRouter.put("/payments/:id", updatePayment);

// Delete a payment
paymentRouter.delete("/payments/:id", deletePayment);
