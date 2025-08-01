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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.createLocationService = exports.getLocationByIdService = exports.getLocationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// import type { InferModel } from "drizzle-orm";
// // Define types for inserting and selecting locations
// export type TLocationInsert = InferModel<typeof locations, "insert">;
// export type TLocationInsert = InferModel<typeof locations, "select">;
const getLocationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.locations.findMany();
});
exports.getLocationsService = getLocationsService;
const getLocationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.locations.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locations.locationId, id),
    });
});
exports.getLocationByIdService = getLocationByIdService;
const createLocationService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.locations).values(data).returning();
    return "Location created successfully 📍";
});
exports.createLocationService = createLocationService;
const updateLocationService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.locations).set(data).where((0, drizzle_orm_1.eq)(schema_1.locations.locationId, id));
    return "Location updated successfully 🛠️";
});
exports.updateLocationService = updateLocationService;
const deleteLocationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.locations).where((0, drizzle_orm_1.eq)(schema_1.locations.locationId, id));
    return "Location deleted successfully 🗑️";
});
exports.deleteLocationService = deleteLocationService;
