

import { Router } from "express";
import {
  createLocation,
  deleteLocation,
  getLocations,
  getLocationById,
  updateLocation,
} from "../location/location.controller"; 

export const locationRouter = Router();

// Get all locations
locationRouter.get("/locations", getLocations);

// Get a location by ID
locationRouter.get("/locations/:id", getLocationById);

// Create a new location
locationRouter.post("/locations", createLocation);

// Update an existing location
locationRouter.put("/locations/:id", updateLocation);

// Delete a location
locationRouter.delete("/locations/:id", deleteLocation);