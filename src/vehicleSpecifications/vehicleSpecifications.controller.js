"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecification = exports.updateVehicleSpecification = exports.createVehicleSpecification = exports.searchByManufacturer = exports.getVehicleSpecificationById = exports.getVehicleSpecifications = void 0;
const vehicleSpecifications_service_1 = require("../vehicleSpecifications/vehicleSpecifications.service");
const getVehicleSpecifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleSpecifications = yield (0, vehicleSpecifications_service_1.getVehicleSpecificationsService)();
        if (!vehicleSpecifications || vehicleSpecifications.length === 0) {
            res.status(404).json({ message: "No vehicle specifications found" });
            return;
        }
        res.status(200).json(vehicleSpecifications);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch vehicle specifications" });
    }
});
exports.getVehicleSpecifications = getVehicleSpecifications;
const getVehicleSpecificationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const vehicleSpecification = yield (0, vehicleSpecifications_service_1.getVehicleSpecificationByIdService)(id);
        if (!vehicleSpecification) {
            res.status(404).json({ message: "Vehicle specification not found" });
            return;
        }
        res.status(200).json(vehicleSpecification);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get vehicle specification" });
    }
});
exports.getVehicleSpecificationById = getVehicleSpecificationById;
const searchByManufacturer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const manufacturer = req.query.manufacturer;
    if (!manufacturer) {
        res.status(400).json({ error: "Manufacturer name is required" });
        return;
    }
    try {
        const search = yield (0, vehicleSpecifications_service_1.searchByManufacturerservices)(manufacturer);
        if (!search || search.length === 0) {
            res.status(404).json({ message: "No manufacturers found matching your query" });
        }
        else {
            res.status(200).json(search);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Error occurred during search" });
    }
});
exports.searchByManufacturer = searchByManufacturer;
const createVehicleSpecification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { manufacturer, model, year, fuelType, engineCapacity, transmission, seatingCapacity, color, features, } = req.body;
    if (!manufacturer || !model || !year || !fuelType || !seatingCapacity) {
        res.status(400).json({ error: "Missing required fields: manufacturer, model, year, fuelType, seatingCapacity" });
        return;
    }
    try {
        const message = yield (0, vehicleSpecifications_service_1.createVehicleSpecificationService)({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to add vehiclespecs" });
    }
});
exports.createVehicleSpecification = createVehicleSpecification;
const updateVehicleSpecification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    const { manufacturer, model, year, fuelType, engineCapacity, transmission, seatingCapacity, color, features, } = req.body;
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        const message = yield (0, vehicleSpecifications_service_1.updateVehicleSpecificationService)(id, {
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
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update vehiclespecs" });
    }
});
exports.updateVehicleSpecification = updateVehicleSpecification;
const deleteVehicleSpecification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const existing = yield (0, vehicleSpecifications_service_1.getVehicleSpecificationByIdService)(id);
        if (!existing) {
            res.status(404).json({ message: "Vehicle specification not found" });
            return;
        }
        const message = yield (0, vehicleSpecifications_service_1.deleteVehicleSpecificationService)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete vehiclespecs" });
    }
});
exports.deleteVehicleSpecification = deleteVehicleSpecification;
