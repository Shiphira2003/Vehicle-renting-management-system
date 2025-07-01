// src/routes/booking.routes.ts

import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getBookingById,
  updateBooking,
} from "../bookings/bookings.controller"; // Adjust path as needed

export const bookingRouter = Router();

// Get all bookings
bookingRouter.get("/bookings", getBookings);

// Get a booking by ID
bookingRouter.get("/bookings/:id", getBookingById);

// Create a new booking
bookingRouter.post("/bookings", createBooking);

// Update an existing booking
bookingRouter.put("/bookings/:id", updateBooking);

// Delete a booking
bookingRouter.delete("/bookings/:id", deleteBooking);
