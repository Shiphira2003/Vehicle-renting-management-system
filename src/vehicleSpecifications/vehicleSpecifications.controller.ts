import { Request, Response } from "express";
import {
  createVehicleSpecificationService,
  deleteVehicleSpecificationService,
  getVehicleSpecificationByIdService,
  getVehicleSpecificationsService,
  searchByManufacturerservices,
  updateVehicleSpecificationService,
} from "../vehicleSpecifications/vehicleSpecifications.service"; 

export const getVehicleSpecifications = async (req: Request, res: Response) => {
  try {
    const vehicleSpecifications = await getVehicleSpecificationsService();
    if (!vehicleSpecifications || vehicleSpecifications.length === 0) {
      res.status(404).json({ message: "No vehicle specifications found" });
      return;
    }
    res.status(200).json(vehicleSpecifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle specifications" });
  }
};

export const getVehicleSpecificationById = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Failed to get vehicle specification" });
  }
};

export const searchByManufacturer = async (req: Request, res: Response) => {
  const manufacturer = req.query.manufacturer as string;
  if (!manufacturer) {
    res.status(400).json({ error: "Manufacturer name is required" });
    return;
  }
  
  try {
    const search = await searchByManufacturerservices(manufacturer);
    if (!search || search.length === 0) {
      res.status(404).json({ message: "No manufacturers found matching your query" });
    } else {
      res.status(200).json(search);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Error occurred during search" });
  }
};

export const createVehicleSpecification = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add vehiclespecs" });
  }
};

export const updateVehicleSpecification = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update vehiclespecs" });
  }
};

export const deleteVehicleSpecification = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete vehiclespecs" });
  }
};