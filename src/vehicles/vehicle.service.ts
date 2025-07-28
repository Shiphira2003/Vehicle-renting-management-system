import { and, lte, eq, ilike } from "drizzle-orm";
import db from "../drizzle/db";
import { vehicleTable, vehicleSpecificationTable } from "../drizzle/schema"; 
import type { TVehicleInsert, TVehicleSelect } from "../drizzle/schema";

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

export const getFilteredVehiclesService = async (
  params: {
    manufacturer?: string;
    maxDailyPrice?: number;
    sort?: 'dailyRateAsc' | 'dailyRateDesc' | 'yearDesc' | 'yearAsc';
  }
): Promise<TVehicleWithSpecSelect[]> => {
  // First get all vehicles with specs
  const vehicles = await db.query.vehicleTable.findMany({
    with: {
      vehicleSpec: true,
    },
  });

  // Apply filtering in memory (since we're dealing with drizzle-orm's relational queries)
  let filteredVehicles = [...vehicles];

  if (params.manufacturer) {
    filteredVehicles = filteredVehicles.filter(vehicle => 
      vehicle.vehicleSpec?.manufacturer.toLowerCase().includes(params.manufacturer!.toLowerCase())
    );
  }

  if (params.maxDailyPrice) {
    filteredVehicles = filteredVehicles.filter(vehicle => 
      Number(vehicle.rentalRate) <= params.maxDailyPrice!
    );
  }

  // Apply sorting
  if (params.sort) {
    filteredVehicles.sort((a, b) => {
      switch (params.sort) {
        case 'dailyRateAsc':
          return Number(a.rentalRate) - Number(b.rentalRate);
        case 'dailyRateDesc':
          return Number(b.rentalRate) - Number(a.rentalRate);
        case 'yearDesc':
          return (b.vehicleSpec?.year || 0) - (a.vehicleSpec?.year || 0);
        case 'yearAsc':
          return (a.vehicleSpec?.year || 0) - (b.vehicleSpec?.year || 0);
        default:
          return 0;
      }
    });
  }

  return filteredVehicles;
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