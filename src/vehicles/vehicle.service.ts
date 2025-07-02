import { eq, } from "drizzle-orm";
import db from "../drizzle/db"; 
import { vehicleTable} from "../drizzle/schema";
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting vehicles
export type TVehicleInsert = InferModel<typeof vehicleTable, "insert">;
export type TVehicleSelect = InferModel<typeof vehicleTable, "select">;


export const getVehiclesService = async (): Promise<TVehicleSelect[]> => {
  return await db.query.vehicleTable.findMany();
};


export const getVehicleByIdService = async (id: number): Promise<TVehicleSelect | undefined> => {
  return await db.query.vehicleTable.findFirst({
    where: eq(vehicleTable.vehicleId, id),
  });
};



export const createVehicleService = async (
  data: TVehicleInsert
): Promise<string> => {
  await db.insert(vehicleTable).values(data).returning();
  return "Vehicle added successfully 🚗";
};


export const updateVehicleService = async (
  id: number,
  data: Partial<TVehicleInsert>
): Promise<string> => {
  await db.update(vehicleTable).set(data).where(eq(vehicleTable.vehicleId, id));
  return "Vehicle updated successfully 🛠️";
};


export const deleteVehicleService = async (
  id: number
): Promise<string> => {
  await db.delete(vehicleTable).where(eq(vehicleTable.vehicleId, id));
  return "Vehicle deleted successfully 🗑️";
};
