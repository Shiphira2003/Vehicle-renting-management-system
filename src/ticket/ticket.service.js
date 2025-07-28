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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketService = exports.updateTicketService = exports.createTicketService = exports.getTicketByIdService = exports.getTicketsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema"); // Assuming your table is exported from here
const getTicketsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.customerSupportTicketTable.findMany({
        with: {
            user: true,
        }
    });
});
exports.getTicketsService = getTicketsService;
const getTicketByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.customerSupportTicketTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.customerSupportTicketTable.ticketId, id),
        with: {
            user: true,
        }
    });
});
exports.getTicketByIdService = getTicketByIdService;
const createTicketService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.customerSupportTicketTable).values(data).returning();
    return "Ticket added successfully 🎟️";
});
exports.createTicketService = createTicketService;
const updateTicketService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.customerSupportTicketTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketTable.ticketId, id));
    return "Ticket updated successfully 🛠️";
});
exports.updateTicketService = updateTicketService;
const deleteTicketService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.customerSupportTicketTable).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTicketTable.ticketId, id));
    return "Ticket deleted successfully 🗑️";
});
exports.deleteTicketService = deleteTicketService;
