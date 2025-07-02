import { Router } from "express";
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
  getVehicleById,
  
  updateVehicle,
} from "../vehicles/vehicles.controller"; 

export const vehicleRouter = Router();

// Get all vehicles
vehicleRouter.get("/vehicles", getVehicles);

// Get a vehicle by ID
vehicleRouter.get("/vehicles/:id", getVehicleById);

// Get vehicles by name (manufacturer name from vehicle specification)


// Create a new vehicle
vehicleRouter.post("/vehicles", createVehicle);

// Update an existing vehicle
vehicleRouter.put("/vehicles/:id", updateVehicle);

// Delete a vehicle
vehicleRouter.delete("/vehicles/:id", deleteVehicle);
