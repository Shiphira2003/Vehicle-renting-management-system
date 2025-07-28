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
exports.createCheckoutSession = exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPaymentsByUserId = exports.getPaymentById = exports.getPayments = void 0;
const payments_service_1 = require("../payments/payments.service");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
});
// ✅ Get all payments
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, payments_service_1.getPaymentsService)();
        if (!payments || payments.length === 0) {
            res.status(404).json({ message: "No payments found" });
            return;
        }
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch payments" });
    }
});
exports.getPayments = getPayments;
// ✅ Get a payment by ID
const getPaymentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const payment = yield (0, payments_service_1.getPaymentByIdService)(id);
        if (!payment) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch payment" });
    }
});
exports.getPaymentById = getPaymentById;
// ✅ NEW: Get payments by user ID
const getPaymentsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID format" });
        return;
    }
    try {
        const payments = yield (0, payments_service_1.getPaymentsByUserIdService)(userId);
        if (!payments || payments.length === 0) {
            res.status(404).json({ message: "No payments found for this user" });
            return;
        }
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch user payments" });
    }
});
exports.getPaymentsByUserId = getPaymentsByUserId;
// ✅ Create a payment
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request body for createPayment:", req.body);
    const { bookingId, amount, paymentStatus, paymentDate, paymentMethod, transactionId, } = req.body;
    if (bookingId === undefined || amount === undefined || !paymentMethod) {
        res.status(400).json({ error: "Missing required fields: bookingId, amount, paymentMethod" });
        return;
    }
    try {
        const message = yield (0, payments_service_1.createPaymentService)({
            bookingId,
            amount,
            paymentStatus: paymentStatus || 'Pending',
            paymentDate: paymentDate ? new Date(paymentDate) : undefined,
            paymentMethod,
            transactionId,
        });
        res.status(201).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create payments" });
    }
});
exports.createPayment = createPayment;
// ✅ Update a payment
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    const { bookingId, amount, paymentStatus, paymentDate, paymentMethod, transactionId, } = req.body;
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        const message = yield (0, payments_service_1.updatePaymentService)(id, {
            bookingId,
            amount,
            paymentStatus,
            paymentDate: paymentDate ? new Date(paymentDate) : undefined,
            paymentMethod,
            transactionId,
        });
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update payments" });
    }
});
exports.updatePayment = updatePayment;
// ✅ Delete a payment
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const existing = yield (0, payments_service_1.getPaymentByIdService)(id);
        if (!existing) {
            res.status(404).json({ message: "Payment not found" });
            return;
        }
        const message = yield (0, payments_service_1.deletePaymentService)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete payments" });
    }
});
exports.deletePayment = deletePayment;
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, bookingId, userId } = req.body;
    if (!amount || isNaN(amount)) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: amount,
                        product_data: {
                            name: 'vehicle Payment',
                            description: 'vehicle booking payment',
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookingId: bookingId ? String(bookingId) : '',
                userId: userId ? String(userId) : '',
            },
            success_url: 'http://localhost:5173/userDashboard',
            cancel_url: 'http://localhost:5173/userDashboard',
        });
        res.status(200).json({ url: session.url });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});
exports.createCheckoutSession = createCheckoutSession;
