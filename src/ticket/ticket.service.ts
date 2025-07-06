import { eq } from "drizzle-orm";
import  db  from "../drizzle/db"; // Assuming your db instance is exported from here
import { TSupportTicketInsert, TSupportTicketSelect, customerSupportTicketTable} from "../drizzle/schema"; // Assuming your table is exported from here

export const getTicketsService = async (): Promise<TSupportTicketSelect[]> => {
  return await db.query.customerSupportTicketTable.findMany();
};


export const getTicketByIdService = async (id: number): Promise<TSupportTicketSelect | undefined> => {
  return await db.query.customerSupportTicketTable.findFirst({
    where: eq(customerSupportTicketTable.ticketId, id),
  });
};


export const createTicketService = async (
  data: TSupportTicketInsert
): Promise<string> => {
  await db.insert(customerSupportTicketTable).values(data).returning();
  return "Ticket added successfully 🎟️";
};


export const updateTicketService = async (
  id: number,
  data: Partial<TSupportTicketInsert>
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
