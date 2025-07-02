import { Request, Response} from "express";
import {
  createTicketService,
  deleteTicketService,
  getTicketByIdService,
  getTicketsService,
  updateTicketService,
} from "../ticket/ticket.service"; 


export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getTicketsService();
    if (!tickets || tickets.length === 0) {
      res.status(404).json({ message: "No tickets found" });
      return;
    }
    res.status(200).json(tickets);
  } catch (error:any) {
      res.status(500).json({ error:error.message || "Failed to get tickets" });
  }
};


export const getTicketById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const ticket = await getTicketByIdService(id);
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
  } catch (error:any) {
      res.status(500).json({ error:error.message || "Failed to get ticket " });
  }
};


export const createTicket = async (req: Request, res: Response) => {
  const {
    userId,
    subject,
    description,
    status, // Optional,
  } = req.body;

  // Basic validation 
  if (userId === undefined || !subject || !description) {
    res.status(400).json({ error: "Missing required fields: userId, subject, description" });
    return;
  }

  try {
    const message = await createTicketService({
      userId,
      subject,
      description,
      status: status || 'Open', 
    });
    res.status(201).json({ message });
  } catch (error:any) {
     res.status(500).json({ error:error.message || "Failed to create ticket" });
  }
};


export const updateTicket = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    userId,
    subject,
    description,
    status,
  } = req.body;

 
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updateTicketService(id, {
      userId,
      subject,
      description,
      status,
      
    });
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to update ticket" });
  }
};


export const deleteTicket = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getTicketByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    const message = await deleteTicketService(id);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to delete ticket" });
  }
};
