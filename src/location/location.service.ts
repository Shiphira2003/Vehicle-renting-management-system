

import { eq } from "drizzle-orm";
import db  from "../drizzle/db"; 
import { TLocationInsert, locations, TLocationSelect } from "../drizzle/schema"; 
// import type { InferModel } from "drizzle-orm";

// // Define types for inserting and selecting locations
// export type TLocationInsert = InferModel<typeof locations, "insert">;
// export type TLocationInsert = InferModel<typeof locations, "select">;


export const getLocationsService = async (): Promise<TLocationSelect[]> => {
  return await db.query.locations.findMany();
};


export const getLocationByIdService = async (id: number): Promise<TLocationSelect | undefined> => {
  return await db.query.locations.findFirst({
    where: eq(locations.locationId, id),
  });
};


export const createLocationService = async (
  data: TLocationInsert
): Promise<string> => {
  await db.insert(locations).values(data).returning();
  return "Location created successfully 📍";
};


export const updateLocationService = async (
  id: number,
  data: Partial<TLocationInsert>
): Promise<string> => {
  await db.update(locations).set(data).where(eq(locations.locationId, id));
  return "Location updated successfully 🛠️";
};


export const deleteLocationService = async (
  id: number
): Promise<string> => {
  await db.delete(locations).where(eq(locations.locationId, id));
  return "Location deleted successfully 🗑️";
};