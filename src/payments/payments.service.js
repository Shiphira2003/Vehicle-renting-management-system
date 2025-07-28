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
exports.getPaymentsByUserIdService = exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentByIdService = exports.getPaymentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getPaymentsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.payments.findMany({
        orderBy: [(0, drizzle_orm_1.desc)(schema_1.payments.createdAt)],
        with: {
            booking: {
                with: {
                    user: true,
                    vehicle: {
                        with: {
                            vehicleSpec: true,
                        },
                    },
                },
            },
        },
    });
});
exports.getPaymentsService = getPaymentsService;
const getPaymentByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.payments.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.payments.paymentId, id),
        with: {
            booking: {
                columns: {
                    vehicleId: true,
                    userId: true,
                    bookingId: true,
                    bookingDate: true,
                    returnDate: true,
                    bookingStatus: true,
                    totalAmount: true,
                }
            }
        }
    });
});
exports.getPaymentByIdService = getPaymentByIdService;
const createPaymentService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.payments).values(data).returning();
    return "Payment created successfully 💰";
});
exports.createPaymentService = createPaymentService;
const updatePaymentService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.payments).set(data).where((0, drizzle_orm_1.eq)(schema_1.payments.paymentId, id));
    return "Payment updated successfully 🛠️";
});
exports.updatePaymentService = updatePaymentService;
const deletePaymentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.payments).where((0, drizzle_orm_1.eq)(schema_1.payments.paymentId, id));
    return "Payment deleted successfully 🗑️";
});
exports.deletePaymentService = deletePaymentService;
// ✅ NEW: Get payments by userId
const getPaymentsByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userBookings = yield db_1.default.query.bookingsTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.userId, userId),
        columns: { bookingId: true },
    });
    const bookingIds = userBookings.map((booking) => booking.bookingId);
    if (bookingIds.length === 0)
        return [];
    return yield db_1.default.query.payments.findMany({
        where: (payments, { inArray }) => inArray(payments.bookingId, bookingIds),
    });
});
exports.getPaymentsByUserIdService = getPaymentsByUserIdService;
