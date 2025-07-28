import { Router } from "express";
import {
  createVehicleSpecification,
  deleteVehicleSpecification,
  getVehicleSpecifications,
  getVehicleSpecificationById,
  updateVehicleSpecification,
  searchByManufacturer,
} from "../vehicleSpecifications/vehicleSpecifications.controller"; 

export const vehicleSpecificationRouter = Router();

// Get all vehicle specifications
vehicleSpecificationRouter.get("/vehicle-specifications", getVehicleSpecifications);

// Search vehicle specifications by manufacturer
vehicleSpecificationRouter.get("/vehicle-specifications/search", searchByManufacturer);

// Get a vehicle specification by ID
vehicleSpecificationRouter.get("/vehicle-specifications/:id", getVehicleSpecificationById);

// Create a new vehicle specification
vehicleSpecificationRouter.post("/vehicle-specifications", createVehicleSpecification);

// Update an existing vehicle specification
vehicleSpecificationRouter.put("/vehicle-specifications/:id", updateVehicleSpecification);

// Delete a vehicle specification
vehicleSpecificationRouter.delete("/vehicle-specifications/:id", deleteVehicleSpecification);