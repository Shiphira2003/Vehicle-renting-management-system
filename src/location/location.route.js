"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const express_1 = require("express");
const location_controller_1 = require("../location/location.controller");
exports.locationRouter = (0, express_1.Router)();
// Get all locations
exports.locationRouter.get("/locations", location_controller_1.getLocations);
// Get a location by ID
exports.locationRouter.get("/locations/:id", location_controller_1.getLocationById);
// Create a new location
exports.locationRouter.post("/locations", location_controller_1.createLocation);
// Update an existing location
exports.locationRouter.put("/locations/:id", location_controller_1.updateLocation);
// Delete a location
exports.locationRouter.delete("/locations/:id", location_controller_1.deleteLocation);
