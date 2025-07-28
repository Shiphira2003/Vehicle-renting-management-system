"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = require("express");
const ticket_controller_1 = require("../ticket/ticket.controller"); // Adjust path as needed
exports.ticketRouter = (0, express_1.Router)();
// Get all tickets
exports.ticketRouter.get("/tickets", ticket_controller_1.getTickets);
// Get a ticket by ID
exports.ticketRouter.get("/tickets/:id", ticket_controller_1.getTicketById);
// Create a new ticket
exports.ticketRouter.post("/tickets", ticket_controller_1.createTicket);
// Update an existing ticket
exports.ticketRouter.put("/tickets/:id", ticket_controller_1.updateTicket);
// Delete a ticket
exports.ticketRouter.delete("/tickets/:id", ticket_controller_1.deleteTicket);
