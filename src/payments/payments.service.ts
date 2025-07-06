// src/services/payment.service.ts

import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; 
import {  TPaymentInsert, TPaymentSelect, payments } from "../drizzle/schema"; 

export const getPaymentsService = async (): Promise<TPaymentSelect[]> => {
  return await db.query.payments.findMany();
};


export const getPaymentByIdService = async (id: number): Promise<TPaymentSelect | undefined> => {
  return await db.query.payments.findFirst({
    where: eq(payments.paymentId, id),
  });
};


export const createPaymentService = async (
  data: TPaymentInsert
): Promise<string> => {
  await db.insert(payments).values(data).returning();
  return "Payment created successfully 💰";
};


export const updatePaymentService = async (
  id: number,
  data: Partial<TPaymentInsert>
): Promise<string> => {
  await db.update(payments).set(data).where(eq(payments.paymentId, id));
  return "Payment updated successfully 🛠️";
};


export const deletePaymentService = async (
  id: number
): Promise<string> => {
  await db.delete(payments).where(eq(payments.paymentId, id));
  return "Payment deleted successfully 🗑️";
};
