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
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.getLocations = void 0;
const location_service_1 = require("../location/location.service");
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield (0, location_service_1.getLocationsService)();
        if (!locations || locations.length === 0) {
            res.status(404).json({ message: "No locations found" });
            return;
        }
        res.status(200).json(locations);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch location" });
    }
});
exports.getLocations = getLocations;
const getLocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const location = yield (0, location_service_1.getLocationByIdService)(id);
        if (!location) {
            res.status(404).json({ message: "Location not found" });
            return;
        }
        res.status(200).json(location);
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to fetch location" });
    }
});
exports.getLocationById = getLocationById;
const createLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, contact, } = req.body;
    // Basic validation
    if (!name || !address) {
        res.status(400).json({ error: "Missing required fields: name, address" });
        return;
    }
    try {
        const message = yield (0, location_service_1.createLocationService)({
            name,
            address,
            contact,
        });
        res.status(201).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to add location" });
    }
});
exports.createLocation = createLocation;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    const { name, address, contact, } = req.body;
    // No specific validation for update, as partial updates are allowed
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ error: "No fields provided for update" });
        return;
    }
    try {
        const message = yield (0, location_service_1.updateLocationService)(id, {
            name,
            address,
            contact,
        });
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to update location" });
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid ID format" });
        return;
    }
    try {
        const existing = yield (0, location_service_1.getLocationByIdService)(id);
        if (!existing) {
            res.status(404).json({ message: "Location not found" });
            return;
        }
        const message = yield (0, location_service_1.deleteLocationService)(id);
        res.status(200).json({ message });
    }
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to delete location" });
    }
});
exports.deleteLocation = deleteLocation;
