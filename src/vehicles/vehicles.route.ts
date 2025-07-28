import { Router } from "express";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  getVehicleById,
  getFilteredVehicles,
  updateVehicle,
} from "../vehicles/vehicles.controller"; 

export const vehicleRouter = Router();

// Get all vehicles
vehicleRouter.get("/vehicles", getVehicles);

// Get filtered vehicles
vehicleRouter.get("/vehicles/filter", getFilteredVehicles);

// Get a vehicle by ID
vehicleRouter.get("/vehicles/:id", getVehicleById);

// Create a new vehicle
vehicleRouter.post("/vehicles", createVehicle);

// Update an existing vehicle
vehicleRouter.put("/vehicles/:id", updateVehicle);

// Delete a vehicle
vehicleRouter.delete("/vehicles/:id", deleteVehicle);