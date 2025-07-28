"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationRouter = void 0;
const express_1 = require("express");
const vehicleSpecifications_controller_1 = require("../vehicleSpecifications/vehicleSpecifications.controller");
exports.vehicleSpecificationRouter = (0, express_1.Router)();
// Get all vehicle specifications
exports.vehicleSpecificationRouter.get("/vehicle-specifications", vehicleSpecifications_controller_1.getVehicleSpecifications);
// Search vehicle specifications by manufacturer
exports.vehicleSpecificationRouter.get("/vehicle-specifications/search", vehicleSpecifications_controller_1.searchByManufacturer);
// Get a vehicle specification by ID
exports.vehicleSpecificationRouter.get("/vehicle-specifications/:id", vehicleSpecifications_controller_1.getVehicleSpecificationById);
// Create a new vehicle specification
exports.vehicleSpecificationRouter.post("/vehicle-specifications", vehicleSpecifications_controller_1.createVehicleSpecification);
// Update an existing vehicle specification
exports.vehicleSpecificationRouter.put("/vehicle-specifications/:id", vehicleSpecifications_controller_1.updateVehicleSpecification);
// Delete a vehicle specification
exports.vehicleSpecificationRouter.delete("/vehicle-specifications/:id", vehicleSpecifications_controller_1.deleteVehicleSpecification);
