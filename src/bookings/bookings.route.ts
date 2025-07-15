import Router from "express";
import {
    createBooking,
    deleteBookingById,
    getAllBookings,
    getBookingById,
    updateBooking,
    getBookingsByUserId // ✅ import controller
} from "../bookings/bookings.controller";

export const bookingRouter = Router();

// Get all bookings
bookingRouter.get('/bookings', getAllBookings);

// Get booking by ID
bookingRouter.get('/bookings/:id', getBookingById);

// ✅ Get bookings by userId
bookingRouter.get('/bookings/user/:userId', getBookingsByUserId);

// Create a booking
bookingRouter.post('/bookings', createBooking);

// Update booking
bookingRouter.put('/bookings/:id', updateBooking);

// Delete booking
bookingRouter.delete('/bookings/:id', deleteBookingById);
