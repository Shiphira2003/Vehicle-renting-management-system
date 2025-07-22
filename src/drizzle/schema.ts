import {pgTable,serial,varchar,integer,timestamp,numeric,pgEnum,boolean,text,date,} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["user", "admin", "disabled"]);
export const fuelTypeEnum = pgEnum("fuelType", ["Petrol", "Diesel", "Electric", "Hybrid"]);
export const transmissionEnum = pgEnum("transmission", ["Manual", "Automatic"]);
export const bookingStatusEnum = pgEnum("bookingStatus", ["Pending", "Confirmed", "Completed", "Cancelled"]);
export const paymentStatusEnum = pgEnum("paymentStatus", ["Pending", "Paid", "Failed"]);
export const paymentMethodEnum = pgEnum("paymentMethod", ["Stripe", "Mpesa"]);


// Users Table


export const userTable = pgTable("userTable", {
  userId: serial("userId").primaryKey(),
  firstName: varchar("firstname", { length: 255 }).notNull(),
  lastName: varchar("lastname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 20 }),
  address: varchar("address", { length: 255 }),
  role: roleEnum("role").default("user").notNull(),
  imageUrl: varchar("imageUrl", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Vehicle Specifications Table


export const vehicleSpecificationTable = pgTable("vehicleSpecificationTables", {
  vehicleSpecId: serial("vehicleSpecId").primaryKey(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  model: varchar("model", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  fuelType: fuelTypeEnum("fuelType").notNull(),
  engineCapacity: varchar("engineCapacity", { length: 50 }),
  transmission: transmissionEnum("transmission").notNull(),
  seatingCapacity: integer("seatingCapacity").notNull(),
  color: varchar("color", { length: 50 }),
  features: text("features"),
});


// Vehicles Table


export const vehicleTable = pgTable("vehicleTable", {
  imageUrl: varchar("imageUrl", { length: 255 }),
  vehicleId: serial("vehicleId").primaryKey(),
  vehicleSpecId: integer("vehicleSpecId")
    .notNull()
    .references(() => vehicleSpecificationTable.vehicleSpecId, { onDelete: "cascade" }),
  rentalRate: numeric("rentalRate", { precision: 10, scale: 2 }).notNull(),
  availability: boolean("availability").default(true),

  
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Locations Table


export const locations = pgTable("locations", {
  locationId: serial("locationId").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  contact: varchar("contact", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Bookings Table


export const bookingsTable = pgTable("bookingsTable", {
  bookingId: serial("bookingId").primaryKey(),
  userId: integer("userId").notNull().references(() => userTable.userId, { onDelete: "cascade" }),
  vehicleId: integer("vehicleId").notNull().references(() => vehicleTable.vehicleId, { onDelete: "cascade" }),
  locationId: integer("locationId").notNull().references(() => locations.locationId, { onDelete: "cascade" }),
  bookingDate: date("bookingDate").notNull(),
  returnDate: date("returnDate").notNull(),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  bookingStatus: bookingStatusEnum("bookingStatus").default("Pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Payments Table


export const payments = pgTable("payments", {
  paymentId: serial("paymentId").primaryKey(),
  bookingId: integer("bookingId")
    .notNull()
    .references(() => bookingsTable.bookingId, { onDelete: "cascade" }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum("paymentStatus").default("Pending").notNull(),
  paymentDate: timestamp("paymentDate").defaultNow(),
  paymentMethod: paymentMethodEnum("paymentMethod"),
  transactionId: varchar("transactionId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});


// Support Tickets Table


export const customerSupportTicketTable = pgTable("customerSupportTicketTables", {
  ticketId: serial("ticketId").primaryKey(),
  userId: integer("userId")
    .notNull()
    .references(() => userTable.userId, { onDelete: "cascade" }),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: varchar("status", { length: 50 }).default("Open"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

//infer types

// USERS
export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;

// VEHICLE SPECIFICATIONS
export type TVehicleSpecificationInsert = typeof vehicleSpecificationTable.$inferInsert;
export type TVehicleSpecificationSelect = typeof vehicleSpecificationTable.$inferSelect;

// VEHICLES
export type TVehicleInsert = typeof vehicleTable.$inferInsert;
export type TVehicleSelect = typeof vehicleTable.$inferSelect;

// LOCATIONS
export type TLocationInsert = typeof locations.$inferInsert;
export type TLocationSelect = typeof locations.$inferSelect;

// BOOKINGS
export type TBookingInsert = typeof bookingsTable.$inferInsert;
export type TBookingSelect = typeof bookingsTable.$inferSelect;

// PAYMENTS
export type TPaymentInsert = typeof payments.$inferInsert;
export type TPaymentSelect = typeof payments.$inferSelect;

// SUPPORT TICKETS
export type TSupportTicketInsert = typeof customerSupportTicketTable.$inferInsert;
export type TSupportTicketSelect = typeof customerSupportTicketTable.$inferSelect;


// RELATIONS


export const usersRelations = relations(userTable, ({ many }) => ({
  bookings: many(bookingsTable),
  supportTickets: many(customerSupportTicketTable),
}));

export const locationsRelations = relations(locations, ({ many }) => ({
  bookings: many(bookingsTable),
}));

export const vehicleSpecsRelations = relations(vehicleSpecificationTable, ({ many }) => ({
  vehicles: many(vehicleTable),
}));

export const vehiclesRelations = relations(vehicleTable, ({ one, many }) => ({
  vehicleSpec: one(vehicleSpecificationTable, {
    fields: [vehicleTable.vehicleSpecId],
    references: [vehicleSpecificationTable.vehicleSpecId],
  }),
  bookings: many(bookingsTable),
}));

export const bookingsRelations = relations(bookingsTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [bookingsTable.userId],
    references: [userTable.userId],
  }),
  vehicle: one(vehicleTable, {
    fields: [bookingsTable.vehicleId],
    references: [vehicleTable.vehicleId],
  }),
  location: one(locations, {
    fields: [bookingsTable.locationId],
    references: [locations.locationId],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookingsTable, {
    fields: [payments.bookingId],
    references: [bookingsTable.bookingId],
  }),
}));

export const supportTicketsRelations = relations(customerSupportTicketTable, ({ one }) => ({
  user: one(userTable, {
    fields: [customerSupportTicketTable.userId],
    references: [userTable.userId],
  }),
}));