"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = require("express");
const vehicles_controller_1 = require("../vehicles/vehicles.controller");
exports.vehicleRouter = (0, express_1.Router)();
// Get all vehicles
exports.vehicleRouter.get("/vehicles", vehicles_controller_1.getVehicles);
// Get filtered vehicles
exports.vehicleRouter.get("/vehicles/filter", vehicles_controller_1.getFilteredVehicles);
// Get a vehicle by ID
exports.vehicleRouter.get("/vehicles/:id", vehicles_controller_1.getVehicleById);
// Create a new vehicle
exports.vehicleRouter.post("/vehicles", vehicles_controller_1.createVehicle);
// Update an existing vehicle
exports.vehicleRouter.put("/vehicles/:id", vehicles_controller_1.updateVehicle);
// Delete a vehicle
exports.vehicleRouter.delete("/vehicles/:id", vehicles_controller_1.deleteVehicle);
