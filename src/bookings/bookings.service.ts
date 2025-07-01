// src/services/booking.service.ts

import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; 
import { bookingTable } from "../drizzle/schema"; 
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting bookings
export type TBookingInsert = InferModel<typeof bookingTable, "insert">;
export type TBookingSelect = InferModel<typeof bookingTable, "select">;


export const getBookingsService = async (): Promise<TBookingSelect[]> => {
  return await db.query.bookingTable.findMany();
};


export const getBookingByIdService = async (id: number): Promise<TBookingSelect | undefined> => {
  return await db.query.bookingTable.findFirst({
    where: eq(bookingTable.bookingId, id),
  });
};


export const createBookingService = async (
  data: TBookingInsert
): Promise<string> => {
  await db.insert(bookingTable).values(data).returning();
  return "Booking created successfully 📅";
};


export const updateBookingService = async (
  id: number,
  data: Partial<TBookingInsert>
): Promise<string> => {
  await db.update(bookingTable).set(data).where(eq(bookingTable.bookingId, id));
  return "Booking updated successfully 🛠️";
};


export const deleteBookingService = async (
  id: number
): Promise<string> => {
  await db.delete(bookingTable).where(eq(bookingTable.bookingId, id));
  return "Booking deleted successfully 🗑️";
};