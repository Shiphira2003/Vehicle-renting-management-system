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
exports.getBookingsByUserIdService = exports.deleteBookingService = exports.updateBookingServices = exports.createBookingServices = exports.getBookingByIdService = exports.GetAllBookingService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Get all bookings
const GetAllBookingService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.bookingsTable.findMany({
        with: {
            user: true,
            vehicle: {
                with: {
                    vehicleSpec: true
                }
            },
            location: true,
            payments: true,
        },
        orderBy: [(0, drizzle_orm_1.desc)(schema_1.bookingsTable.bookingId)]
    });
});
exports.GetAllBookingService = GetAllBookingService;
// Get booking by ID
const getBookingByIdService = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.bookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, bookingId),
        with: {
            user: {
                columns: {
                    userId: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    contact: true,
                }
            },
            vehicle: {
                columns: {
                    vehicleId: true,
                    rentalRate: true,
                    availability: true,
                },
                with: {
                    vehicleSpec: {
                        columns: {
                            manufacturer: true,
                            model: true,
                            year: true,
                            color: true,
                            transmission: true,
                            engineCapacity: true,
                            fuelType: true,
                            seatingCapacity: true,
                            features: true,
                        }
                    }
                }
            },
            location: {
                columns: {
                    locationId: true,
                    name: true,
                    address: true,
                    contact: true,
                }
            },
            payments: {
                columns: {
                    bookingId: true,
                    amount: true,
                    paymentDate: true,
                    paymentStatus: true,
                    paymentMethod: true,
                }
            },
        }
    });
});
exports.getBookingByIdService = getBookingByIdService;
// Create booking
const createBookingServices = (booking) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.bookingsTable).values(booking).returning();
    return "Booking Created Successfully";
});
exports.createBookingServices = createBookingServices;
// Update booking
const updateBookingServices = (bookingId, booking) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.bookingsTable).set(booking).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, bookingId));
    return "Booking Updated Successfully";
});
exports.updateBookingServices = updateBookingServices;
// Delete booking
const deleteBookingService = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.bookingsTable).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.bookingId, bookingId));
    return "Booking Deleted Successfully";
});
exports.deleteBookingService = deleteBookingService;
// ✅ Get bookings by userId
const getBookingsByUserIdService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.bookingsTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingsTable.userId, userId),
        with: {
            user: true,
            vehicle: {
                with: {
                    vehicleSpec: true,
                },
            },
            location: true,
            payments: true,
        },
        orderBy: [(0, drizzle_orm_1.desc)(schema_1.bookingsTable.bookingId)],
    });
});
exports.getBookingsByUserIdService = getBookingsByUserIdService;
