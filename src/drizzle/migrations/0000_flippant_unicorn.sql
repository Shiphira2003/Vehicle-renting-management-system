CREATE TYPE "public"."booking_status" AS ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "bookings" (
	"booking_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"vehicle_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"booking_date" timestamp NOT NULL,
	"return_date" timestamp NOT NULL,
	"total_amount" real NOT NULL,
	"booking_status" "booking_status" DEFAULT 'Pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_support_tickets" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subject" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"status" varchar(50) DEFAULT 'Open' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"location_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" varchar(256) NOT NULL,
	"contact_phone" varchar(20),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer NOT NULL,
	"amount" real NOT NULL,
	"payment_status" "payment_status" DEFAULT 'Pending' NOT NULL,
	"payment_date" timestamp DEFAULT now() NOT NULL,
	"payment_method" varchar(100) NOT NULL,
	"transaction_id" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "payments_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(256) NOT NULL,
	"lastname" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"user_type" "user_role" DEFAULT 'user',
	"contact_phone" varchar(20),
	"address" varchar(256),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vehicle_specifications" (
	"vehicleSpec_id" serial PRIMARY KEY NOT NULL,
	"manufacturer" varchar(256) NOT NULL,
	"model" varchar(256) NOT NULL,
	"year" integer NOT NULL,
	"fuel_type" varchar(50) NOT NULL,
	"engine_capacity" varchar(50),
	"transmission" varchar(50),
	"seating_capacity" integer NOT NULL,
	"color" varchar(50),
	"features" text
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"vehicleSpec_id" integer NOT NULL,
	"rental_rate" real NOT NULL,
	"availability" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
