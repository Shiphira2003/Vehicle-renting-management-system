// src/services/payment.service.ts

import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; 
import { paymentTable } from "../drizzle/schema"; 
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting payments
export type TPaymentInsert = InferModel<typeof paymentTable, "insert">;
export type TPaymentSelect = InferModel<typeof paymentTable, "select">;


export const getPaymentsService = async (): Promise<TPaymentSelect[]> => {
  return await db.query.paymentTable.findMany();
};


export const getPaymentByIdService = async (id: number): Promise<TPaymentSelect | undefined> => {
  return await db.query.paymentTable.findFirst({
    where: eq(paymentTable.paymentId, id),
  });
};


export const createPaymentService = async (
  data: TPaymentInsert
): Promise<string> => {
  await db.insert(paymentTable).values(data).returning();
  return "Payment created successfully 💰";
};


export const updatePaymentService = async (
  id: number,
  data: Partial<TPaymentInsert>
): Promise<string> => {
  await db.update(paymentTable).set(data).where(eq(paymentTable.paymentId, id));
  return "Payment updated successfully 🛠️";
};


export const deletePaymentService = async (
  id: number
): Promise<string> => {
  await db.delete(paymentTable).where(eq(paymentTable.paymentId, id));
  return "Payment deleted successfully 🗑️";
};
