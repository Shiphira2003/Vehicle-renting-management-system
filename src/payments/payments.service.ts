import { desc, eq } from "drizzle-orm";
import db from "../drizzle/db"; 
import { payments, bookingsTable, TPaymentInsert, TPaymentSelect } from "../drizzle/schema"; 

export const getPaymentsService = async (): Promise<TPaymentSelect[]> => {
  return await db.query.payments.findMany(
{
  orderBy: [desc(payments.createdAt)],
   with: {
      booking: {
        with: {
          user: true,
          vehicle: {
            with: {
              vehicleSpec: true,
            },
          },
        },
      },
    },
} );
};

export const getPaymentByIdService = async (id: number): Promise<TPaymentSelect | undefined> => {
  return await db.query.payments.findFirst({
    where: eq(payments.paymentId, id),
    with:{
      booking:{
        columns:{
          vehicleId:true,
          userId:true,
          bookingId:true,
          bookingDate:true,
          returnDate:true,
          bookingStatus:true,
          totalAmount:true,
        }
      }
    }
  });
};

export const createPaymentService = async (data: TPaymentInsert): Promise<string> => {
  await db.insert(payments).values(data).returning();
  return "Payment created successfully 💰";
};

export const updatePaymentService = async (id: number, data: Partial<TPaymentInsert>): Promise<string> => {
  await db.update(payments).set(data).where(eq(payments.paymentId, id));
  return "Payment updated successfully 🛠️";
};

export const deletePaymentService = async (id: number): Promise<string> => {
  await db.delete(payments).where(eq(payments.paymentId, id));
  return "Payment deleted successfully 🗑️";
};

// ✅ NEW: Get payments by userId
export const getPaymentsByUserIdService = async (userId: number): Promise<TPaymentSelect[]> => {
  const userBookings = await db.query.bookingsTable.findMany({
    where: eq(bookingsTable.userId, userId),
    columns: { bookingId: true },
  });

  const bookingIds = userBookings.map((booking) => booking.bookingId);

  if (bookingIds.length === 0) return [];

  return await db.query.payments.findMany({
    where: (payments, { inArray }) => inArray(payments.bookingId, bookingIds),
  });
};

