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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingById = exports.updateBooking = exports.createBooking = exports.getBookingsByUserId = exports.getBookingById = exports.getAllBookings = void 0;
const bookings_service_1 = require("../bookings/bookings.service");
// Get all bookings
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield (0, bookings_service_1.GetAllBookingService)();
        if (!allBookings || allBookings.length === 0) {
            res.status(404).json({ error: "No bookings found" });
        }
        else {
            res.status(200).json(allBookings);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch bookings" });
    }
});
exports.getAllBookings = getAllBookings;
// Get booking by ID
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) {
        res.status(400).json({ error: "Invalid booking ID" });
        return;
    }
    try {
        const bookingById = yield (0, bookings_service_1.getBookingByIdService)(bookingId);
        if (!bookingById) {
            res.status(404).json({ error: "No booking found" });
        }
        else {
            res.status(200).json(bookingById);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch booking" });
    }
});
exports.getBookingById = getBookingById;
// ✅ Get bookings by User ID
const getBookingsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
    }
    try {
        const userBookings = yield (0, bookings_service_1.getBookingsByUserIdService)(userId);
        if (!userBookings || userBookings.length === 0) {
            res.status(404).json({ error: "No bookings found for this user" });
        }
        else {
            res.status(200).json(userBookings);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch user bookings" });
    }
});
exports.getBookingsByUserId = getBookingsByUserId;
// Create a booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingDate, returnDate, totalAmount, vehicleId, locationId, userId } = req.body;
    if (!bookingDate || !returnDate || !totalAmount || !vehicleId || !locationId || !userId) {
        res.status(400).json({ error: "All fields are required to create a booking!" });
        return;
    }
    try {
        // The service should return the created booking object
        const newBooking = yield (0, bookings_service_1.createBookingServices)({ bookingDate, returnDate, totalAmount, vehicleId, locationId, userId });
        res.status(201).json(newBooking); // Return the full new booking object
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create booking" });
    }
});
exports.createBooking = createBooking;
// Update booking
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) {
        res.status(400).json({ error: "Invalid booking ID" });
        return;
    }
    const updatedData = req.body; // Allow partial updates
    if (Object.keys(updatedData).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        // The service should return the updated booking object or a success message
        const updatedBooking = yield (0, bookings_service_1.updateBookingServices)(bookingId, updatedData);
        res.status(200).json(updatedBooking); // Return the updated booking or message
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update booking" });
    }
});
exports.updateBooking = updateBooking;
// Delete booking
const deleteBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(req.params.id);
    if (isNaN(bookingId)) {
        res.status(400).json({ error: "Invalid booking ID" });
        return;
    }
    try {
        yield (0, bookings_service_1.deleteBookingService)(bookingId);
        res.status(200).json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete booking" });
    }
});
exports.deleteBookingById = deleteBookingById;
