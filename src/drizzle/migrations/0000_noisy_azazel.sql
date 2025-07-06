CREATE TYPE "public"."bookingStatus" AS ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."fuelType" AS ENUM('Petrol', 'Diesel', 'Electric', 'Hybrid');--> statement-breakpoint
CREATE TYPE "public"."paymentMethod" AS ENUM('Stripe', 'Mpesa');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('Pending', 'Paid', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin', 'disabled');--> statement-breakpoint
CREATE TYPE "public"."transmission" AS ENUM('Manual', 'Automatic');--> statement-breakpoint
CREATE TABLE "bookingsTable" (
	"bookingId" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"vehicleId" integer NOT NULL,
	"locationId" integer NOT NULL,
	"bookingDate" date NOT NULL,
	"returnDate" date NOT NULL,
	"totalAmount" numeric(10, 2) NOT NULL,
	"bookingStatus" "bookingStatus" DEFAULT 'Pending' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customerSupportTicketTables" (
	"ticketId" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"subject" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(50) DEFAULT 'Open',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"locationId" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	"contact" varchar(20),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"paymentId" serial PRIMARY KEY NOT NULL,
	"bookingId" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"paymentStatus" "paymentStatus" DEFAULT 'Pending' NOT NULL,
	"paymentDate" timestamp DEFAULT now(),
	"paymentMethod" "paymentMethod",
	"transactionId" varchar(255),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "userTable" (
	"userId" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"contact" varchar(20),
	"address" varchar(255),
	"role" "role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "userTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicleSpecificationTables" (
	"vehicleSpecId" serial PRIMARY KEY NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"year" integer NOT NULL,
	"fuelType" "fuelType" NOT NULL,
	"engineCapacity" varchar(50),
	"transmission" "transmission" NOT NULL,
	"seatingCapacity" integer NOT NULL,
	"color" varchar(50),
	"features" text
);
--> statement-breakpoint
CREATE TABLE "vehicleTable" (
	"vehicleId" serial PRIMARY KEY NOT NULL,
	"vehicleSpecId" integer NOT NULL,
	"rentalRate" numeric(10, 2) NOT NULL,
	"availability" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookingsTable" ADD CONSTRAINT "bookingsTable_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookingsTable" ADD CONSTRAINT "bookingsTable_vehicleId_vehicleTable_vehicleId_fk" FOREIGN KEY ("vehicleId") REFERENCES "public"."vehicleTable"("vehicleId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookingsTable" ADD CONSTRAINT "bookingsTable_locationId_locations_locationId_fk" FOREIGN KEY ("locationId") REFERENCES "public"."locations"("locationId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customerSupportTicketTables" ADD CONSTRAINT "customerSupportTicketTables_userId_userTable_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."userTable"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_bookingsTable_bookingId_fk" FOREIGN KEY ("bookingId") REFERENCES "public"."bookingsTable"("bookingId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicleTable" ADD CONSTRAINT "vehicleTable_vehicleSpecId_vehicleSpecificationTables_vehicleSpecId_fk" FOREIGN KEY ("vehicleSpecId") REFERENCES "public"."vehicleSpecificationTables"("vehicleSpecId") ON DELETE cascade ON UPDATE no action;