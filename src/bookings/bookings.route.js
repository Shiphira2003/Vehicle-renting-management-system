"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_1 = require("../bookings/bookings.controller");
exports.bookingRouter = (0, express_1.default)();
// Get all bookings
exports.bookingRouter.get('/bookings', bookings_controller_1.getAllBookings);
// Get booking by ID
exports.bookingRouter.get('/bookings/:id', bookings_controller_1.getBookingById);
// ✅ Get bookings by userId
exports.bookingRouter.get('/bookings/user/:userId', bookings_controller_1.getBookingsByUserId);
// Create a booking
exports.bookingRouter.post('/bookings', bookings_controller_1.createBooking);
// Update booking
exports.bookingRouter.put('/bookings/:id', bookings_controller_1.updateBooking);
// Delete booking
exports.bookingRouter.delete('/bookings/:id', bookings_controller_1.deleteBookingById);
