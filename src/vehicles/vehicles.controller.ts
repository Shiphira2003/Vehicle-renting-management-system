import { Request, Response } from "express";
import {
  createVehicleService,
  deleteVehicleService,
  getVehicleByIdService,
  getVehiclesService,
  getFilteredVehiclesService,
  updateVehicleService,
} from "../vehicles/vehicle.service"; 

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await getVehiclesService();
    if (!vehicles || vehicles.length === 0) {
      res.status(404).json({ message: "No vehicles found" });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch vehicles" });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const vehicle = await getVehicleByIdService(id);
    if (!vehicle) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to get vehicle" });
  }
};

export const getFilteredVehicles = async (req: Request, res: Response) => {
  try {
    const { manufacturer, maxDailyPrice, sort } = req.query;
    
    const vehicles = await getFilteredVehiclesService({
      manufacturer: manufacturer as string,
      maxDailyPrice: maxDailyPrice ? Number(maxDailyPrice) : undefined,
      sort: sort as 'dailyRateAsc' | 'dailyRateDesc' | 'yearDesc' | 'yearAsc'
    });

    if (!vehicles || vehicles.length === 0) {
      res.status(404).json({ message: "No vehicles found matching your criteria" });
      return;
    }
    
    res.status(200).json(vehicles);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to filter vehicles" });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  const {
    vehicleSpecId,
    rentalRate,
    availability,
  } = req.body;

  if (vehicleSpecId === undefined || rentalRate === undefined) {
    res.status(400).json({ error: "Missing required fields: vehicleSpecId, rentalRate" });
    return;
  }

  try {
    const message = await createVehicleService({
      vehicleSpecId,
      rentalRate,
      availability: availability !== undefined ? availability : true,
    });
    res.status(201).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add vehicle" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    vehicleSpecId,
    rentalRate,
    availability,
  } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updateVehicleService(id, {
      vehicleSpecId,
      rentalRate,
      availability,
    });
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update vehicle" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getVehicleByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Vehicle not found" });
      return;
    }

    const message = await deleteVehicleService(id);
    res.status(200).json({ message });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete vehicle" });
  }
};