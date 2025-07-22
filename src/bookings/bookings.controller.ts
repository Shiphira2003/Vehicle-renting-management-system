import { Request, Response } from "express";
import {
  createBookingServices,
  deleteBookingService,
  GetAllBookingService,
  getBookingByIdService,
  updateBookingServices,
  getBookingsByUserIdService // ✅ import the new service
} from "../bookings/bookings.service";
import { TBookingInsert } from "../drizzle/schema"; // Import TBookingInsert for type safety

// Get all bookings
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await GetAllBookingService();
    if (!allBookings || allBookings.length === 0) {
      res.status(404).json({ error: "No bookings found" });
    } else {
      res.status(200).json(allBookings);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch bookings" });
  }
};

// Get booking by ID
export const getBookingById = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const bookingById = await getBookingByIdService(bookingId);
    if (!bookingById) {
      res.status(404).json({ error: "No booking found" });
    } else {
      res.status(200).json(bookingById);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch booking" });
  }
};

// ✅ Get bookings by User ID
export const getBookingsByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    res.status(400).json({ error: "Invalid user ID" });
    return;
  }

  try {
    const userBookings = await getBookingsByUserIdService(userId);
    if (!userBookings || userBookings.length === 0) {
      res.status(404).json({ error: "No bookings found for this user" });
    } else {
      res.status(200).json(userBookings);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch user bookings" });
  }
};

// Create a booking
export const createBooking = async (req: Request, res: Response) => {
  const { bookingDate, returnDate, totalAmount, vehicleId, locationId, userId } = req.body;

  if (!bookingDate || !returnDate || !totalAmount || !vehicleId || !locationId || !userId) {
    res.status(400).json({ error: "All fields are required to create a booking!" });
    return;
  }

  try {
    // The service should return the created booking object
    const newBooking = await createBookingServices({ bookingDate, returnDate, totalAmount, vehicleId, locationId, userId });
    res.status(201).json(newBooking); // Return the full new booking object
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create booking" });
  }
};

// Update booking
export const updateBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  const updatedData: Partial<TBookingInsert> = req.body; // Allow partial updates

  if (Object.keys(updatedData).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    // The service should return the updated booking object or a success message
    const updatedBooking = await updateBookingServices(bookingId, updatedData);
    res.status(200).json(updatedBooking); // Return the updated booking or message
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update booking" });
  }
};

// Delete booking
export const deleteBookingById = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.id);
  if (isNaN(bookingId)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    await deleteBookingService(bookingId);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete booking" });
  }
};
