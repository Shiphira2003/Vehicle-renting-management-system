import { Request, Response } from "express";
import Stripe from "stripe";
import db from "../drizzle/db";
import { payments } from "../drizzle/schema";

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const webhookHandler = async (req: Request, res: Response) => {

  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret);
  } catch (err: any) {
    console.error("⚠ Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
   
   const bookingId = session.metadata?.bookingId;
   console.log(bookingId);
    const userId = session.metadata?.userId;
    console.log(userId);
    const transactionId = session.payment_intent as string;
    console.log(transactionId);
    const amount = session.amount_total;
    

    if (!bookingId || !userId || !transactionId || !amount) {
      console.error("❌ Missing required metadata (bookingId, userId, transactionId, amount)");
      res.status(400).json({ error: "Missing required metadata" }); // ✅ no return
return; // just return to stop execution

    }

    // ✅ Convert Stripe status to valid enum value
    let paymentStatus: "pending" | "Paid" | "Failed" = "pending";

    const stripeStatus = session.payment_status as string;

    if (stripeStatus === "paid") {
      paymentStatus = "Paid";
    } else if (stripeStatus === "unpaid" || stripeStatus === "Failed") {
      paymentStatus = "Failed";
    }

    try {
      console.log(`💰 Saving payment for booking ${bookingId}`);
    await db.insert(payments).values({
  bookingId: Number(bookingId),
  userId: Number(userId),
  amount: parseFloat((amount / 100).toFixed(2)), // convert cents to decimal
  paymentStatus,
  transactionId,
  paymentMethod: "Stripe", // Optional: set default
});
      console.log(`✅ Payment recorded for booking ${bookingId}`);
    } catch (err) {
      console.error("❌ Failed to save payment in DB", err);
      res.status(500).json({ error: "Database insert failed" });
      return
    }
  }

  res.status(200).json({ received: true });
  return
};