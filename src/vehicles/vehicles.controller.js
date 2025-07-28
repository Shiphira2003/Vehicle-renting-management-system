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
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getFilteredVehicles = exports.getVehicleById = exports.getVehicles = void 0;
const vehicle_service_1 = require("../vehicles/vehicle.service");
const getVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield (0, vehicle_service_1.getVehiclesService)();
        if (!vehicles || vehicles.length === 0) {
            res.status(404).json({ message: "No vehicles found" });
            return;
        }
        res.status(200).json(vehicles);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch vehicles" });
    }
});
exports.getVehicles = getVehicles;
const getVehicleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const vehicle = yield (0, vehicle_service_1.getVehicleByIdService)(id);
        if (!vehicle) {
            res.status(404).json({ message: "Vehicle not found" });
            return;
        }
        res.status(200).json(vehicle);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get vehicle" });
    }
});
exports.getVehicleById = getVehicleById;
const getFilteredVehicles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { manufacturer, maxDailyPrice, sort } = req.query;
        const vehicles = yield (0, vehicle_service_1.getFilteredVehiclesService)({
            manufacturer: manufacturer,
            maxDailyPrice: maxDailyPrice ? Number(maxDailyPrice) : undefined,
            sort: sort
        });
        if (!vehicles || vehicles.length === 0) {
            res.status(404).json({ message: "No vehicles found matching your criteria" });
            return;
        }
        res.status(200).json(vehicles);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to filter vehicles" });
    }
});
exports.getFilteredVehicles = getFilteredVehicles;
const createVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { vehicleSpecId, rentalRate, availability, } = req.body;
    if (vehicleSpecId === undefined || rentalRate === undefined) {
        res.status(400).json({ error: "Missing required fields: vehicleSpecId, rentalRate" });
        return;
    }
    try {
        const message = yield (0, vehicle_service_1.createVehicleService)({
            vehicleSpecId,
            rentalRate,
            availability: availability !== undefined ? availability : true,
        });
        res.status(201).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to add vehicle" });
    }
});
exports.createVehicle = createVehicle;
const updateVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    const { vehicleSpecId, rentalRate, availability, } = req.body;
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        const message = yield (0, vehicle_service_1.updateVehicleService)(id, {
            vehicleSpecId,
            rentalRate,
            availability,
        });
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update vehicle" });
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const existing = yield (0, vehicle_service_1.getVehicleByIdService)(id);
        if (!existing) {
            res.status(404).json({ message: "Vehicle not found" });
            return;
        }
        const message = yield (0, vehicle_service_1.deleteVehicleService)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete vehicle" });
    }
});
exports.deleteVehicle = deleteVehicle;
