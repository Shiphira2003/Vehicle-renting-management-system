// src/services/vehicleSpecification.service.ts

import { eq, ilike } from "drizzle-orm";
import db from "../drizzle/db"; 
import { vehicleSpecificationTable } from "../drizzle/schema"; 
import type { InferModel } from "drizzle-orm";

// Define types for inserting and selecting vehicle specifications
export type TVehicleSpecificationInsert = InferModel<typeof vehicleSpecificationTable, "insert">;
export type TVehicleSpecificationSelect = InferModel<typeof vehicleSpecificationTable, "select">;


export const getVehicleSpecificationsService = async (): Promise<TVehicleSpecificationSelect[]> => {
  return await db.query.vehicleSpecificationTable.findMany();
};


export const getVehicleSpecificationByIdService = async (id: number): Promise<TVehicleSpecificationSelect | undefined> => {
  return await db.query.vehicleSpecificationTable.findFirst({
    where: eq(vehicleSpecificationTable.vehicleSpecId, id),
  });
};


export const createVehicleSpecificationService = async (
  data: TVehicleSpecificationInsert
): Promise<string> => {
  await db.insert(vehicleSpecificationTable).values(data).returning();
  return "Vehicle specification added successfully 🚗";
};

// search by manufacturer
export const searchByManufacturerservices = async(manufacturer: string): Promise<TVehicleSpecificationSelect[]>=>{
  return await db.query.vehicleSpecificationTable.findMany({
    where: ilike(vehicleSpecificationTable.manufacturer,`%${manufacturer}%`)
  })
}

export const updateVehicleSpecificationService = async (
  id: number,
  data: Partial<TVehicleSpecificationInsert>
): Promise<string> => {
  await db.update(vehicleSpecificationTable).set(data).where(eq(vehicleSpecificationTable.vehicleSpecId, id));
  return "Vehicle specification updated successfully 🛠️";
};


export const deleteVehicleSpecificationService = async (
  id: number
): Promise<string> => {
  await db.delete(vehicleSpecificationTable).where(eq(vehicleSpecificationTable.vehicleSpecId, id));
  return "Vehicle specification deleted successfully 🗑️";
};