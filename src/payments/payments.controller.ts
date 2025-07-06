

import { Request, Response } from "express";
import {
  createPaymentService,
  deletePaymentService,
  getPaymentByIdService,
  getPaymentsService,
  updatePaymentService,
} from "../payments/payments.service"; 


export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await getPaymentsService();
    if (!payments || payments.length === 0) {
      res.status(404).json({ message: "No payments found" });
      return;
    }
    res.status(200).json(payments);
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to fetch payments" });
  }
};


export const getPaymentById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const payment = await getPaymentByIdService(id);
    if (!payment) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json(payment);
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to fetch payment" });
  }
};


export const createPayment = async (req: Request, res: Response) => {

console.log("Received request body for createPayment:", req.body);

  const {
    bookingId,
    amount,
    paymentStatus, // Optional,
    paymentDate,   // Optional, 
    paymentMethod,
    transactionId, // Optional, unique
  } = req.body;

  // Basic validation for required fields
  if (bookingId === undefined || amount === undefined || !paymentMethod) {
    res.status(400).json({ error: "Missing required fields: bookingId, amount, paymentMethod" });
    return;
  }

  try {
    const message = await createPaymentService({
      bookingId,
      amount,
      paymentStatus: paymentStatus || 'Pending', 
      paymentDate: paymentDate ? new Date(paymentDate) : undefined,
      paymentMethod,
      transactionId,
      
    });
    res.status(201).json({ message });
  } catch (error:any) {
     res.status(500).json({ error:error.message || "Failed to create payments" });
  }
};


export const updatePayment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    bookingId,
    amount,
    paymentStatus,
    paymentDate,
    paymentMethod,
    transactionId,
  } = req.body;

  // No specific validation for update, as partial updates are allowed
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updatePaymentService(id, {
      bookingId,
      amount,
      paymentStatus,
      paymentDate: paymentDate ? new Date(paymentDate) : undefined, 
      paymentMethod,
      transactionId,
      
    });
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to update payments" });
  }
};


export const deletePayment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getPaymentByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }

    const message = await deletePaymentService(id);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to delete payments" });
  }
};
