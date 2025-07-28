"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
// === src/modules/payment/payment.routes.ts ===
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const payments_webhook_1 = require("./payments.webhook");
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.get("/payments", payments_controller_1.getPayments);
exports.paymentRouter.post("/payments", payments_controller_1.createPayment);
exports.paymentRouter.get("/payments/:id", payments_controller_1.getPaymentById);
exports.paymentRouter.put("/payments/:id", payments_controller_1.updatePayment);
exports.paymentRouter.delete("/payments/:id", payments_controller_1.deletePayment);
exports.paymentRouter.post("/payments/checkout-session", payments_controller_1.createCheckoutSession);
exports.paymentRouter.post("/webhook", payments_webhook_1.webhookHandler);
