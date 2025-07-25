// === src/modules/payment/payment.routes.ts ===
import { Router } from "express";
import {
  createPayment,
  deletePayment,
  getPayments,
  getPaymentById,
  updatePayment,
  createCheckoutSession,
} from "./payments.controller";
import { webhookHandler } from "./payments.webhook";

export const paymentRouter = Router();

paymentRouter.get("/payments", getPayments);
paymentRouter.post("/payments", createPayment);
paymentRouter.get("/payments/:id", getPaymentById);
paymentRouter.put("/payments/:id", updatePayment);
paymentRouter.delete("/payments/:id", deletePayment);
paymentRouter.post("/payments/checkout-session", createCheckoutSession);
paymentRouter.post("/webhook", webhookHandler);



