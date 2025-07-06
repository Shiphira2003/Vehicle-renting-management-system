import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { vehicleTable, vehicleSpecificationTable } from "../drizzle/schema"; 
import type { TVehicleInsert, TVehicleSelect } from "../drizzle/schema";

// Define a new type for Vehicle with its spec
// This combines the vehicle select type with the nested vehicle specification select type
export type TVehicleWithSpecSelect = TVehicleSelect & {
  vehicleSpec?: typeof vehicleSpecificationTable.$inferSelect;
};


export const getVehiclesService = async (): Promise<TVehicleWithSpecSelect[]> => {
  return await db.query.vehicleTable.findMany({
    with: {
      vehicleSpec: true, 
    },
  });
};


export const getVehicleByIdService = async (id: number): Promise<TVehicleWithSpecSelect | undefined> => {
  return await db.query.vehicleTable.findFirst({
    where: eq(vehicleTable.vehicleId, id),
    with: {
      vehicleSpec: true,
    },
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