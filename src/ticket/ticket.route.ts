import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from "../ticket/ticket.controller"; // Adjust path as needed

export const ticketRouter = Router();

// Get all tickets
ticketRouter.get("/tickets", getTickets);

// Get a ticket by ID
ticketRouter.get("/tickets/:id", getTicketById);

// Create a new ticket
ticketRouter.post("/tickets", createTicket);

// Update an existing ticket
ticketRouter.put("/tickets/:id", updateTicket);

// Delete a ticket
ticketRouter.delete("/tickets/:id", deleteTicket);
