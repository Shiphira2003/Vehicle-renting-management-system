// src/controllers/booking.controller.ts

import { Request, Response } from "express";
import {
  createBookingService,
  deleteBookingService,
  getBookingByIdService,
  getBookingsService,
  updateBookingService,
} from "../bookings/bookings.service"; 


export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await getBookingsService();
    if (!bookings || bookings.length === 0) {
      res.status(404).json({ message: "No bookings found" });
      return;
    }
    res.status(200).json(bookings);
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to place bookings" });
  }
};


export const getBookingById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const booking = await getBookingByIdService(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    res.status(200).json(booking);
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to get a booking" });
  }
};


export const createBooking = async (req: Request, res: Response) => {
  const {
    userId,
    vehicleId,
    locationId,
    bookingDate,
    returnDate,
    totalAmount,
    bookingStatus, // Optional
  } = req.body;

  // Basic validation for required fields
  if (userId === undefined || vehicleId === undefined || locationId === undefined ||
      !bookingDate || !returnDate || totalAmount === undefined) {
    res.status(400).json({ error: "Missing required fields: userId, vehicleId, locationId, bookingDate, returnDate, totalAmount" });
    return;
  }

  try {
    const message = await createBookingService({
      userId,
      vehicleId,
      locationId,
      bookingDate: new Date(bookingDate), 
      returnDate: new Date(returnDate),  
      totalAmount,
      bookingStatus: bookingStatus || 'Pending',
      
    });
    res.status(201).json({ message });
  } catch (error:any) {
     res.status(500).json({ error:error.message || "Failed to place booking" });
  }
};


export const updateBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    userId,
    vehicleId,
    locationId,
    bookingDate,
    returnDate,
    totalAmount,
    bookingStatus,
  } = req.body;

  // No specific validation for update, as partial updates are allowed
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updateBookingService(id, {
      userId,
      vehicleId,
      locationId,
      bookingDate: bookingDate ? new Date(bookingDate) : undefined, 
      returnDate: returnDate ? new Date(returnDate) : undefined,   
      totalAmount,
      bookingStatus,
      
    });
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to update booking:" });
  }
};


export const deleteBooking = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getBookingByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const message = await deleteBookingService(id);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to delete booking" });
  }
};
