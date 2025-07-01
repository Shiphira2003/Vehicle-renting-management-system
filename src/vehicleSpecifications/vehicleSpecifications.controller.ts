

import { Request, Response, NextFunction } from "express";
import {
  createVehicleSpecificationService,
  deleteVehicleSpecificationService,
  getVehicleSpecificationByIdService,
  getVehicleSpecificationsService,
  updateVehicleSpecificationService,
} from "../vehicleSpecifications/vehicleSpecifications.service"; 

export const getVehicleSpecifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vehicleSpecifications = await getVehicleSpecificationsService();
    if (!vehicleSpecifications || vehicleSpecifications.length === 0) {
      res.status(404).json({ message: "No vehicle specifications found" });
      return;
    }
    res.status(200).json(vehicleSpecifications);
  } catch (error) {
    next(error);
  }
};


export const getVehicleSpecificationById = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const vehicleSpecification = await getVehicleSpecificationByIdService(id);
    if (!vehicleSpecification) {
      res.status(404).json({ message: "Vehicle specification not found" });
      return;
    }
    res.status(200).json(vehicleSpecification);
  } catch (error) {
    next(error);
  }
};


export const createVehicleSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const {
    manufacturer,
    model,
    year,
    fuelType,
    engineCapacity,
    transmission,
    seatingCapacity,
    color,
    features,
  } = req.body;

  // Basic validation for required fields
  if (!manufacturer || !model || !year || !fuelType || !seatingCapacity) {
    res.status(400).json({ error: "Missing required fields: manufacturer, model, year, fuelType, seatingCapacity" });
    return;
  }

  try {
    const message = await createVehicleSpecificationService({
      manufacturer,
      model,
      year,
      fuelType,
      engineCapacity,
      transmission,
      seatingCapacity,
      color,
      features,
    });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};


export const updateVehicleSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  const {
    manufacturer,
    model,
    year,
    fuelType,
    engineCapacity,
    transmission,
    seatingCapacity,
    color,
    features,
  } = req.body;

  // No specific validation for update, as partial updates are allowed, but could add if needed
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const message = await updateVehicleSpecificationService(id, {
      manufacturer,
      model,
      year,
      fuelType,
      engineCapacity,
      transmission,
      seatingCapacity,
      color,
      features,
    });
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};


export const deleteVehicleSpecification = async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const existing = await getVehicleSpecificationByIdService(id);
    if (!existing) {
      res.status(404).json({ message: "Vehicle specification not found" });
      return;
    }

    const message = await deleteVehicleSpecificationService(id);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};