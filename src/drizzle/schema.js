"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportTicketsRelations = exports.paymentsRelations = exports.bookingsRelations = exports.vehiclesRelations = exports.vehicleSpecsRelations = exports.locationsRelations = exports.usersRelations = exports.customerSupportTicketTable = exports.payments = exports.bookingsTable = exports.locations = exports.vehicleTable = exports.vehicleSpecificationTable = exports.userTable = exports.paymentMethodEnum = exports.paymentStatusEnum = exports.bookingStatusEnum = exports.transmissionEnum = exports.fuelTypeEnum = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin", "disabled"]);
exports.fuelTypeEnum = (0, pg_core_1.pgEnum)("fuelType", ["Petrol", "Diesel", "Electric", "Hybrid"]);
exports.transmissionEnum = (0, pg_core_1.pgEnum)("transmission", ["Manual", "Automatic"]);
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("bookingStatus", ["Pending", "Confirmed", "Completed", "Cancelled"]);
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("paymentStatus", ["Pending", "Paid", "Failed"]);
exports.paymentMethodEnum = (0, pg_core_1.pgEnum)("paymentMethod", ["Stripe", "Mpesa"]);
// Users Table
exports.userTable = (0, pg_core_1.pgTable)("userTable", {
    userId: (0, pg_core_1.serial)("userId").primaryKey(),
    firstName: (0, pg_core_1.varchar)("firstname", { length: 255 }).notNull(),
    lastName: (0, pg_core_1.varchar)("lastname", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    contact: (0, pg_core_1.varchar)("contact", { length: 20 }),
    address: (0, pg_core_1.varchar)("address", { length: 255 }),
    role: (0, exports.roleEnum)("role").default("user").notNull(),
    imageUrl: (0, pg_core_1.varchar)("imageUrl", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Vehicle Specifications Table
exports.vehicleSpecificationTable = (0, pg_core_1.pgTable)("vehicleSpecificationTables", {
    vehicleSpecId: (0, pg_core_1.serial)("vehicleSpecId").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 255 }).notNull(),
    model: (0, pg_core_1.varchar)("model", { length: 255 }).notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuelType: (0, exports.fuelTypeEnum)("fuelType").notNull(),
    engineCapacity: (0, pg_core_1.varchar)("engineCapacity", { length: 50 }),
    transmission: (0, exports.transmissionEnum)("transmission").notNull(),
    seatingCapacity: (0, pg_core_1.integer)("seatingCapacity").notNull(),
    color: (0, pg_core_1.varchar)("color", { length: 50 }),
    features: (0, pg_core_1.text)("features"),
});
// Vehicles Table
exports.vehicleTable = (0, pg_core_1.pgTable)("vehicleTable", {
    imageUrl: (0, pg_core_1.varchar)("imageUrl", { length: 255 }),
    vehicleId: (0, pg_core_1.serial)("vehicleId").primaryKey(),
    vehicleSpecId: (0, pg_core_1.integer)("vehicleSpecId")
        .notNull()
        .references(() => exports.vehicleSpecificationTable.vehicleSpecId, { onDelete: "cascade" }),
    rentalRate: (0, pg_core_1.numeric)("rentalRate", { precision: 10, scale: 2 }).notNull(),
    availability: (0, pg_core_1.boolean)("availability").default(true),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Locations Table
exports.locations = (0, pg_core_1.pgTable)("locations", {
    locationId: (0, pg_core_1.serial)("locationId").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    address: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
    contact: (0, pg_core_1.varchar)("contact", { length: 20 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Bookings Table
exports.bookingsTable = (0, pg_core_1.pgTable)("bookingsTable", {
    bookingId: (0, pg_core_1.serial)("bookingId").primaryKey(),
    userId: (0, pg_core_1.integer)("userId").notNull().references(() => exports.userTable.userId, { onDelete: "cascade" }),
    vehicleId: (0, pg_core_1.integer)("vehicleId").notNull().references(() => exports.vehicleTable.vehicleId, { onDelete: "cascade" }),
    locationId: (0, pg_core_1.integer)("locationId").notNull().references(() => exports.locations.locationId, { onDelete: "cascade" }),
    bookingDate: (0, pg_core_1.date)("bookingDate").notNull(),
    returnDate: (0, pg_core_1.date)("returnDate").notNull(),
    totalAmount: (0, pg_core_1.numeric)("totalAmount", { precision: 10, scale: 2 }).notNull(),
    bookingStatus: (0, exports.bookingStatusEnum)("bookingStatus").default("Pending").notNull(),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Payments Table
exports.payments = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("paymentId").primaryKey(),
    bookingId: (0, pg_core_1.integer)("bookingId")
        .notNull()
        .references(() => exports.bookingsTable.bookingId, { onDelete: "cascade" }),
    amount: (0, pg_core_1.numeric)("amount", { precision: 10, scale: 2 }).notNull(),
    paymentStatus: (0, exports.paymentStatusEnum)("paymentStatus").default("Pending").notNull(),
    paymentDate: (0, pg_core_1.timestamp)("paymentDate").defaultNow(),
    paymentMethod: (0, exports.paymentMethodEnum)("paymentMethod"),
    transactionId: (0, pg_core_1.varchar)("transactionId", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Support Tickets Table
exports.customerSupportTicketTable = (0, pg_core_1.pgTable)("customerSupportTicketTables", {
    ticketId: (0, pg_core_1.serial)("ticketId").primaryKey(),
    userId: (0, pg_core_1.integer)("userId")
        .notNull()
        .references(() => exports.userTable.userId, { onDelete: "cascade" }),
    subject: (0, pg_core_1.varchar)("subject", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 50 }).default("Open"),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// RELATIONS
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    bookings: many(exports.bookingsTable),
    supportTickets: many(exports.customerSupportTicketTable),
}));
exports.locationsRelations = (0, drizzle_orm_1.relations)(exports.locations, ({ many }) => ({
    bookings: many(exports.bookingsTable),
}));
exports.vehicleSpecsRelations = (0, drizzle_orm_1.relations)(exports.vehicleSpecificationTable, ({ many }) => ({
    vehicles: many(exports.vehicleTable),
}));
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.vehicleTable, ({ one, many }) => ({
    vehicleSpec: one(exports.vehicleSpecificationTable, {
        fields: [exports.vehicleTable.vehicleSpecId],
        references: [exports.vehicleSpecificationTable.vehicleSpecId],
    }),
    bookings: many(exports.bookingsTable),
}));
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.bookingsTable, ({ one, many }) => ({
    user: one(exports.userTable, {
        fields: [exports.bookingsTable.userId],
        references: [exports.userTable.userId],
    }),
    vehicle: one(exports.vehicleTable, {
        fields: [exports.bookingsTable.vehicleId],
        references: [exports.vehicleTable.vehicleId],
    }),
    location: one(exports.locations, {
        fields: [exports.bookingsTable.locationId],
        references: [exports.locations.locationId],
    }),
    payments: many(exports.payments),
}));
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.payments, ({ one }) => ({
    booking: one(exports.bookingsTable, {
        fields: [exports.payments.bookingId],
        references: [exports.bookingsTable.bookingId],
    }),
}));
exports.supportTicketsRelations = (0, drizzle_orm_1.relations)(exports.customerSupportTicketTable, ({ one }) => ({
    user: one(exports.userTable, {
        fields: [exports.customerSupportTicketTable.userId],
        references: [exports.userTable.userId],
    }),
}));
