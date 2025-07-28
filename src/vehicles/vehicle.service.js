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
exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getFilteredVehiclesService = exports.getVehicleByIdService = exports.getVehiclesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getVehiclesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.vehicleTable.findMany({
        with: {
            vehicleSpec: true,
        },
    });
});
exports.getVehiclesService = getVehiclesService;
const getVehicleByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.vehicleTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleTable.vehicleId, id),
        with: {
            vehicleSpec: true,
        },
    });
});
exports.getVehicleByIdService = getVehicleByIdService;
const getFilteredVehiclesService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    // First get all vehicles with specs
    const vehicles = yield db_1.default.query.vehicleTable.findMany({
        with: {
            vehicleSpec: true,
        },
    });
    // Apply filtering in memory (since we're dealing with drizzle-orm's relational queries)
    let filteredVehicles = [...vehicles];
    if (params.manufacturer) {
        filteredVehicles = filteredVehicles.filter(vehicle => { var _a; return (_a = vehicle.vehicleSpec) === null || _a === void 0 ? void 0 : _a.manufacturer.toLowerCase().includes(params.manufacturer.toLowerCase()); });
    }
    if (params.maxDailyPrice) {
        filteredVehicles = filteredVehicles.filter(vehicle => Number(vehicle.rentalRate) <= params.maxDailyPrice);
    }
    // Apply sorting
    if (params.sort) {
        filteredVehicles.sort((a, b) => {
            var _a, _b, _c, _d;
            switch (params.sort) {
                case 'dailyRateAsc':
                    return Number(a.rentalRate) - Number(b.rentalRate);
                case 'dailyRateDesc':
                    return Number(b.rentalRate) - Number(a.rentalRate);
                case 'yearDesc':
                    return (((_a = b.vehicleSpec) === null || _a === void 0 ? void 0 : _a.year) || 0) - (((_b = a.vehicleSpec) === null || _b === void 0 ? void 0 : _b.year) || 0);
                case 'yearAsc':
                    return (((_c = a.vehicleSpec) === null || _c === void 0 ? void 0 : _c.year) || 0) - (((_d = b.vehicleSpec) === null || _d === void 0 ? void 0 : _d.year) || 0);
                default:
                    return 0;
            }
        });
    }
    return filteredVehicles;
});
exports.getFilteredVehiclesService = getFilteredVehiclesService;
const createVehicleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.vehicleTable).values(data).returning();
    return "Vehicle added successfully 🚗";
});
exports.createVehicleService = createVehicleService;
const updateVehicleService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.vehicleTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.vehicleTable.vehicleId, id));
    return "Vehicle updated successfully 🛠️";
});
exports.updateVehicleService = updateVehicleService;
const deleteVehicleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.vehicleTable).where((0, drizzle_orm_1.eq)(schema_1.vehicleTable.vehicleId, id));
    return "Vehicle deleted successfully 🗑️";
});
exports.deleteVehicleService = deleteVehicleService;
