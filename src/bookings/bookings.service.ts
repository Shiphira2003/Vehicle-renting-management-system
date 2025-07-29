import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db";
import { bookingsTable, TBookingInsert, TBookingSelect } from "../drizzle/schema";

// Get all bookings
export const GetAllBookingService = async (): Promise<TBookingSelect[]> => {
    return await db.query.bookingsTable.findMany({
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
        orderBy: [desc(bookingsTable.bookingId)]
    });
};

// Get booking by ID
export const getBookingByIdService = async (bookingId: number): Promise<TBookingSelect | undefined> => {
    return await db.query.bookingsTable.findFirst({
        where: eq(bookingsTable.bookingId, bookingId),
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
};

// Create booking
export const createBookingServices = async (
  booking: TBookingInsert
): Promise<TBookingSelect | undefined> => {
  const [createdBooking] = await db.insert(bookingsTable).values(booking).returning();
  return createdBooking;
};


// Update booking
export const updateBookingServices = async (bookingId: number, booking: Partial<TBookingInsert>): Promise<string> => {
    await db.update(bookingsTable).set(booking).where(eq(bookingsTable.bookingId, bookingId));
    return "Booking Updated Successfully";
};

// Delete booking
export const deleteBookingService = async (bookingId: number) => {
    await db.delete(bookingsTable).where(eq(bookingsTable.bookingId, bookingId));
    return "Booking Deleted Successfully";
};

// ✅ Get bookings by userId
export const getBookingsByUserIdService = async (userId: number): Promise<TBookingSelect[]> => {
    return await db.query.bookingsTable.findMany({
        where: eq(bookingsTable.userId, userId),
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
        orderBy: [desc(bookingsTable.bookingId)],
    });
};
