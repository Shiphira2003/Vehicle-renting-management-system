import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum, integer, unique, primaryKey, real } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define Enums
export const roleEnum = pgEnum('role', ['user', 'admin']);
export const bookingStatusEnum = pgEnum('booking_status', ['Pending', 'Confirmed', 'Cancelled', 'Completed']);
export const paymentStatusEnum = pgEnum('payment_status', ['Pending', 'Completed', 'Failed']);

// --- Table Definitions ---

// User Table
export const userTable = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  firstName: varchar('firstname', { length: 256 }).notNull(),
  lastName: varchar('lastname', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  address: varchar('address', { length: 256 }),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Vehicle Specification Table
export const vehicleSpecificationTable = pgTable('vehicle_specifications', {
  vehicleSpecId: serial('vehicleSpec_id').primaryKey(),
  manufacturer: varchar('manufacturer', { length: 256 }).notNull(),
  model: varchar('model', { length: 256 }).notNull(),
  year: integer('year').notNull(),
  fuelType: varchar('fuel_type', { length: 50 }).notNull(),
  engineCapacity: varchar('engine_capacity', { length: 50 }),
  transmission: varchar('transmission', { length: 50 }),
  seatingCapacity: integer('seating_capacity').notNull(),
  color: varchar('color', { length: 50 }),
  features: text('features'),
});

// Vehicles Table
export const vehicleTable = pgTable('vehicles', {
  vehicleId: serial('vehicle_id').primaryKey(),
  vehicleSpecId: integer('vehicleSpec_id').notNull(),
  rentalRate: real('rental_rate').notNull(),
  availability: boolean('availability').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Location and Branches Table
export const locationTable = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Bookings Table
export const bookingTable = pgTable('bookings', {
  bookingId: serial('booking_id').primaryKey(),
  userId: integer('user_id').notNull(),
  vehicleId: integer('vehicle_id').notNull(),
  locationId: integer('location_id').notNull(),
  bookingDate: timestamp('booking_date').notNull(),
  returnDate: timestamp('return_date').notNull(),
  totalAmount: real('total_amount').notNull(),
  bookingStatus: bookingStatusEnum('booking_status').default('Pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Payments Table
export const paymentTable = pgTable('payments', {
  paymentId: serial('payment_id').primaryKey(),
  bookingId: integer('booking_id').notNull(),
  amount: real('amount').notNull(),
  paymentStatus: paymentStatusEnum('payment_status').default('Pending').notNull(),
  paymentDate: timestamp('payment_date').defaultNow().notNull(),
  paymentMethod: varchar('payment_method', { length: 100 }).notNull(),
  transactionId: varchar('transaction_id', { length: 256 }).unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// Customer Support Tickets Table
export const customerSupportTicketTable = pgTable('customer_support_tickets', {
  ticketId: serial('ticket_id').primaryKey(),
  userId: integer('user_id').notNull(),
  subject: varchar('subject', { length: 256 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 50 }).default('Open').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

// --- Table Relations ---

// User Relations
export const userRelations = relations(userTable, ({ many }) => ({
  bookings: many(bookingTable),
  customerSupportTickets: many(customerSupportTicketTable),
}));

// Vehicle Specifications Relations
export const vehicleSpecificationRelations = relations(vehicleSpecificationTable, ({ many }) => ({
  vehicles: many(vehicleTable),
}));

// Vehicles Relations
export const vehicleRelations = relations(vehicleTable, ({ one, many }) => ({
  vehicleSpecification: one(vehicleSpecificationTable, {
    fields: [vehicleTable.vehicleSpecId],
    references: [vehicleSpecificationTable.vehicleSpecId],
  }),
  bookings: many(bookingTable),
}));

// Locations Relations
export const locationRelations = relations(locationTable, ({ many }) => ({
  bookings: many(bookingTable),
}));

// Bookings Relations
export const bookingRelations = relations(bookingTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [bookingTable.userId],
    references: [userTable.userId],
  }),
  vehicle: one(vehicleTable, {
    fields: [bookingTable.vehicleId],
    references: [vehicleTable.vehicleId],
  }),
  location: one(locationTable, {
    fields: [bookingTable.locationId],
    references: [locationTable.locationId],
  }),
  payments: many(paymentTable),
}));

// Payments Relations
export const paymentRelations = relations(paymentTable, ({ one }) => ({
  booking: one(bookingTable, {
    fields: [paymentTable.bookingId],
    references: [bookingTable.bookingId],
  }),
}));

// Customer Support Tickets Relations
export const customerSupportTicketRelations = relations(customerSupportTicketTable, ({ one }) => ({
  user: one(userTable, {
    fields: [customerSupportTicketTable.userId],
    references: [userTable.userId],
  }),
}));

// --- Inferred Types ---

export type TUserInsert = typeof userTable.$inferInsert;
export type TUserSelect = typeof userTable.$inferSelect;

export type TVehicleSpecificationInsert = typeof vehicleSpecificationTable.$inferInsert;
export type TVehicleSpecificationSelect = typeof vehicleSpecificationTable.$inferSelect;

export type TVehicleInsert = typeof vehicleTable.$inferInsert;
export type TVehicleSelect = typeof vehicleTable.$inferSelect;

export type TLocationInsert = typeof locationTable.$inferInsert;
export type TLocationSelect = typeof locationTable.$inferSelect;

export type TBookingInsert = typeof bookingTable.$inferInsert;
export type TBookingSelect = typeof bookingTable.$inferSelect;

export type TPaymentInsert = typeof paymentTable.$inferInsert;
export type TPaymentSelect = typeof paymentTable.$inferSelect;

export type TCustomerSupportTicketInsert = typeof customerSupportTicketTable.$inferInsert;
export type TCustomerSupportTicketSelect = typeof customerSupportTicketTable.$inferSelect;