// src/controllers/location.controller.ts

import { Request, Response } from "express";
import {
  createLocationService,
  deleteLocationService,
  getLocationByIdService,
  getLocationsService,
  updateLocationService,
} from "../location/location.service";


export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await getLocationsService();
    if (!locations || locations.length === 0) {
      res.status(404).json({ message: "No locations found" });
      return;
    }
    res.status(200).json(locations);
  } catch (error:any) {
     res.status(500).json({ error:error.message || "Failed to fetch location" });
  }
};


export const getLocationById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const location = await getLocationByIdService(id);
    if (!location) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json(location);
  } catch (error:any) {
     res.status(500).json({ error:error.message || "Failed to fetch location" });
  }
};


export const createLocation = async (req: Request, res: Response) => {
  const {
    name,
    address,
    contactPhone,
  } = req.body;

  // Basic validation
  if (!name || !address) {
    res.status(400).json({ error: "Missing required fields: name, address" });
    return;
  }

  try {
    const message = await createLocationService({
      name,
      address,
      contactPhone,
      
    });
    res.status(201).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to add location" });
  }
};


export const updateLocation = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    name,
    address,
    contactPhone,
  } = req.body;

  // No specific validation for update, as partial updates are allowed
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updateLocationService(id, {
      name,
      address,
      contactPhone,
      
    });
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to update location" });
  }
};


export const deleteLocation = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getLocationByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    const message = await deleteLocationService(id);
    res.status(200).json({ message });
  } catch (error:any) {
    res.status(500).json({ error:error.message || "Failed to delete location" });
  }
};