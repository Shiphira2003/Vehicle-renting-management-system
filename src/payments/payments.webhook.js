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
exports.webhookHandler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Stripe instance
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
});
const webhookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        console.error("⚠ Webhook signature verification failed:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.bookingId;
        console.log(bookingId);
        const userId = (_b = session.metadata) === null || _b === void 0 ? void 0 : _b.userId;
        console.log(userId);
        const transactionId = session.payment_intent;
        console.log(transactionId);
        const amount = session.amount_total;
        if (!bookingId || !userId || !transactionId || !amount) {
            console.error("❌ Missing required metadata (bookingId, userId, transactionId, amount)");
            res.status(400).json({ error: "Missing required metadata" }); // ✅ no return
            return; // just return to stop execution
        }
        // ✅ Convert Stripe status to valid enum value
        let paymentStatus = "pending";
        const stripeStatus = session.payment_status;
        if (stripeStatus === "paid") {
            paymentStatus = "Paid";
        }
        else if (stripeStatus === "unpaid" || stripeStatus === "Failed") {
            paymentStatus = "Failed";
        }
        try {
            console.log(`💰 Saving payment for booking ${bookingId}`);
            yield db_1.default.insert(schema_1.payments).values({
                bookingId: Number(bookingId),
                userId: Number(userId),
                amount: parseFloat((amount / 100).toFixed(2)),
                paymentStatus,
                transactionId,
                paymentMethod: "Stripe",
            });
            console.log(`✅ Payment recorded for booking ${bookingId}`);
        }
        catch (err) {
            console.error("❌ Failed to save payment in DB", err);
            res.status(500).json({ error: "Database insert failed" });
            return;
        }
    }
    res.status(200).json({ received: true });
    return;
});
exports.webhookHandler = webhookHandler;
