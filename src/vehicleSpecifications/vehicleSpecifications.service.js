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
exports.deleteVehicleSpecificationService = exports.updateVehicleSpecificationService = exports.createVehicleSpecificationService = exports.searchByManufacturerservices = exports.getVehicleSpecificationByIdService = exports.getVehicleSpecificationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getVehicleSpecificationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.vehicleSpecificationTable.findMany();
});
exports.getVehicleSpecificationsService = getVehicleSpecificationsService;
const getVehicleSpecificationByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.vehicleSpecificationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehicleSpecId, id),
    });
});
exports.getVehicleSpecificationByIdService = getVehicleSpecificationByIdService;
const searchByManufacturerservices = (manufacturer) => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.query.vehicleSpecificationTable.findMany({
        where: (0, drizzle_orm_1.ilike)(schema_1.vehicleSpecificationTable.manufacturer, `%${manufacturer}%`),
        limit: 10
    });
});
exports.searchByManufacturerservices = searchByManufacturerservices;
const createVehicleSpecificationService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.insert(schema_1.vehicleSpecificationTable).values(data).returning();
    return "Vehicle specification added successfully 🚗";
});
exports.createVehicleSpecificationService = createVehicleSpecificationService;
const updateVehicleSpecificationService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.update(schema_1.vehicleSpecificationTable).set(data).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehicleSpecId, id));
    return "Vehicle specification updated successfully 🛠️";
});
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
const deleteVehicleSpecificationService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.delete(schema_1.vehicleSpecificationTable).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehicleSpecId, id));
    return "Vehicle specification deleted successfully 🗑️";
});
exports.deleteVehicleSpecificationService = deleteVehicleSpecificationService;
