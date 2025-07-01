

import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayments,
  getPaymentById,
  updatePayment,
} from "../payments/payments.controller";

export const paymentRouter = Router();

// Get all payments
paymentRouter.get("/payments", getPayments);

// Get a payment by ID
paymentRouter.get("/payments/:id", getPaymentById);

// Create a new payment
paymentRouter.post("/payments", createPayment);

// Update an existing payment
paymentRouter.put("/payments/:id", updatePayment);

// Delete a payment
paymentRouter.delete("/payments/:id", deletePayment);
