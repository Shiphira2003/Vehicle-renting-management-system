import { Request, Response, NextFunction } from "express";
import {
  createVehicleService,
  deleteVehicleService,
  getVehicleByIdService,
  getVehiclesService,
  updateVehicleService,
} from "../vehicles/vehicle.service"; 


export const getVehicles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicles = await getVehiclesService();
    if (!vehicles || vehicles.length === 0) {
      res.status(404).json({ message: "No vehicles found" });
      return;
    }
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};


export const getVehicleById = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error);
  }
};


export const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
  const {
    vehicleSpecId,
    rentalRate,
    availability, // Optional
  } = req.body;

  // Basic validation 
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
  } catch (error) {
    next(error);
  }
};


export const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
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

  // No specific validation for update, as partial updates are allowed
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
  } catch (error) {
    next(error);
  }
};


export const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    next(error);
  }
};
