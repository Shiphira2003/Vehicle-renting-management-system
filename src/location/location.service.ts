

import { eq } from "drizzle-orm";
import db  from "../drizzle/db"; 
import { locationTable } from "../drizzle/schema"; 
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting locations
export type TLocationInsert = InferModel<typeof locationTable, "insert">;
export type TLocationSelect = InferModel<typeof locationTable, "select">;


export const getLocationsService = async (): Promise<TLocationSelect[]> => {
  return await db.query.locationTable.findMany();
};


export const getLocationByIdService = async (id: number): Promise<TLocationSelect | undefined> => {
  return await db.query.locationTable.findFirst({
    where: eq(locationTable.locationId, id),
  });
};


export const createLocationService = async (
  data: TLocationInsert
): Promise<string> => {
  await db.insert(locationTable).values(data).returning();
  return "Location created successfully 📍";
};


export const updateLocationService = async (
  id: number,
  data: Partial<TLocationInsert>
): Promise<string> => {
  await db.update(locationTable).set(data).where(eq(locationTable.locationId, id));
  return "Location updated successfully 🛠️";
};


export const deleteLocationService = async (
  id: number
): Promise<string> => {
  await db.delete(locationTable).where(eq(locationTable.locationId, id));
  return "Location deleted successfully 🗑️";
};