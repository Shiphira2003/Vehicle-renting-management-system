import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; // Assuming your db instance is exported from here
import { customerSupportTicketTable} from "../drizzle/schema"; // Assuming your table is exported from here
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting tickets
export type TTicketInsert = InferModel<typeof customerSupportTicketTable, "insert">;
export type TTicketSelect = InferModel<typeof customerSupportTicketTable, "select">;

/**
 * Retrieves all tickets from the database.
 * @returns A promise that resolves to an array of ticket objects.
 */
export const getTicketsService = async (): Promise<TTicketSelect[]> => {
  return await db.query.customerSupportTicketTable.findMany();
};

/**
 * Retrieves a single ticket by its ID.
 * @param id The ID of the ticket to retrieve.
 * @returns A promise that resolves to the ticket object, or undefined if not found.
 */
export const getTicketByIdService = async (id: number): Promise<TTicketSelect | undefined> => {
  return await db.query.customerSupportTicketTable.findFirst({
    where: eq(customerSupportTicketTable.ticketId, id),
  });
};


export const createTicketService = async (
  data: TTicketInsert
): Promise<string> => {
  await db.insert(customerSupportTicketTable).values(data).returning();
  return "Ticket added successfully 🎟️";
};


export const updateTicketService = async (
  id: number,
  data: Partial<TTicketInsert>
): Promise<string> => {
  await db.update(customerSupportTicketTable).set(data).where(eq(customerSupportTicketTable.ticketId, id));
  return "Ticket updated successfully 🛠️";
};


export const deleteTicketService = async (
  id: number
): Promise<string> => {
  await db.delete(customerSupportTicketTable).where(eq(customerSupportTicketTable.ticketId, id));
  return "Ticket deleted successfully 🗑️";
};
