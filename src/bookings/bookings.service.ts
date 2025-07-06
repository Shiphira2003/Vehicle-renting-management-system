// src/services/booking.service.ts

import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TBookingInsert,
  TBookingSelect,
  bookingsTable,
  userTable,      // Import userTable
  vehicleTable,   // Import vehicleTable
  locations,      // Import locations table
  payments,       // Import payments table if you also want to include them
} from "../drizzle/schema";

// Define a new type for Booking with all its related data
export type TBookingWithRelations = TBookingSelect & {
  user?: typeof userTable.$inferSelect;
  vehicle?: typeof vehicleTable.$inferSelect & { // Nested relation: vehicle with its spec
    vehicleSpec?: typeof vehicleSpecificationTable.$inferSelect; // Assuming you want vehicleSpec too
  };
  location?: typeof locations.$inferSelect;
  payments?: (typeof payments.$inferSelect)[]; // Payments are 'many', so it's an array
};

// You might also need vehicleSpecificationTable if you want nested vehicleSpec
import { vehicleSpecificationTable } from "../drizzle/schema";


export const getBookingsService = async (): Promise<TBookingWithRelations[]> => {
  return await db.query.bookingsTable.findMany({
    with: {
      user: true,      // Eager load the user data
      vehicle: {       // Eager load vehicle data
        with: {
          vehicleSpec: true, // And also eager load vehicle's spec
        },
      },
      location: true,  // Eager load the location data
      payments: true,  // Eager load all associated payments
    },
  });
};


export const getBookingByIdService = async (id: number): Promise<TBookingWithRelations | undefined> => {
  return await db.query.bookingsTable.findFirst({
    where: eq(bookingsTable.bookingId, id),
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
  });
};


export const createBookingService = async (
  data: TBookingInsert
): Promise<string> => {
  await db.insert(bookingsTable).values(data).returning();
  return "Booking created successfully 📅";
};


export const updateBookingService = async (
  id: number,
  data: Partial<TBookingInsert>
): Promise<string> => {
  await db.update(bookingsTable).set(data).where(eq(bookingsTable.bookingId, id));
  return "Booking updated successfully 🛠️";
};


export const deleteBookingService = async (
  id: number
): Promise<string> => {
  await db.delete(bookingsTable).where(eq(bookingsTable.bookingId, id));
  return "Booking deleted successfully 🗑️";
};