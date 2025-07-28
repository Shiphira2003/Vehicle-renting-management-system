"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getTickets = void 0;
const ticket_service_1 = require("../ticket/ticket.service");
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield (0, ticket_service_1.getTicketsService)();
        if (!tickets || tickets.length === 0) {
            res.status(404).json({ message: "No tickets found" });
            return;
        }
        res.status(200).json(tickets);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get tickets" });
    }
});
exports.getTickets = getTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const ticket = yield (0, ticket_service_1.getTicketByIdService)(id);
        if (!ticket) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        res.status(200).json(ticket);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get ticket " });
    }
});
exports.getTicketById = getTicketById;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, subject, description, status, // Optional,
     } = req.body;
    // Basic validation 
    if (userId === undefined || !subject || !description) {
        res.status(400).json({ error: "Missing required fields: userId, subject, description" });
        return;
    }
    try {
        const message = yield (0, ticket_service_1.createTicketService)({
            userId,
            subject,
            description,
            status: status || 'Open',
        });
        res.status(201).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to create ticket" });
    }
});
exports.createTicket = createTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    const { userId, subject, description, status, } = req.body;
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        const message = yield (0, ticket_service_1.updateTicketService)(id, {
            userId,
            subject,
            description,
            status,
        });
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update ticket" });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const existing = yield (0, ticket_service_1.getTicketByIdService)(id);
        if (!existing) {
            res.status(404).json({ message: "Ticket not found" });
            return;
        }
        const message = yield (0, ticket_service_1.deleteTicketService)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete ticket" });
    }
});
exports.deleteTicket = deleteTicket;
