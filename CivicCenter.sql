CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "employees" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "ci" varchar(15) UNIQUE NOT NULL,
  "rif" varchar(15) UNIQUE NOT NULL,
  "first_name" varchar(15) NOT NULL,
  "middle_name" varchar(15),
  "last_name" varchar(15) NOT NULL,
  "surname" varchar(15),
  "address" varchar(100) NOT NULL,
  "phone" varchar(20),
  "birth_date" date NOT NULL,
  "start_date" date NOT NULL,
  "nationality" varchar(20) NOT NULL,
  "blood_type" varchar(3) NOT NULL,
  "allergies" varchar(50) NOT NULL,
  "department" varchar(20) NOT NULL,
  "photo" varchar(50) NOT NULL,
  "status" varchar(15) NOT NULL DEFAULT 'To verified',
  "create_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "information" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "dir" varchar(100) NOT NULL,
  "phone" varchar(20),
  "email" varchar(100)
);
CREATE TABLE "exchangerates" (
  "symbol" varchar(32) PRIMARY KEY,
  "money" varchar(20) NOT NULL,
  "rate" float NOT NULL
);
CREATE TABLE "vacations" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee" varchar(15) NOT NULL,
  "rate" varchar(32) NOT NULL,
  "today" date NOT NULL,
  "start" date NOT NULL,
  "end" date NOT NULL,
  "gross_pay" float NOT NULL,
  "total_deduction" float NOT NULL,
  "net_pay" float NOT NULL,
  "status" varchar(15) NOT NULL DEFAULT 'To Pay',
  "create_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "det_vac_grosspay" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "vacation" varchar(32) NOT NULL,
  "item" varchar(50) NOT NULL,
  "days" integer NOT NULL,
  "daily_rate" float NOT NULL,
  "total" float NOT NULL
);
CREATE TABLE "det_vac_deduction" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "vacation" varchar(32) NOT NULL,
  "item" varchar(50) NOT NULL,
  "total" float NOT NULL
);
CREATE TABLE "users" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(15) UNIQUE NOT NULL,
  "role" varchar(32) NOT NULL,
  "employee" varchar(15) NOT NULL,
  "password" varchar(1024) NOT NULL,
  "email" varchar(100),
  "status" varchar(15) NOT NULL DEFAULT 'To verified',
  "create_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "roles" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "role" varchar(20) NOT NULL,
  "permissions" JSONB NOT NULL
);
CREATE TABLE "loans" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "rate" varchar(32) NOT NULL,
  "authorized" varchar(15) NOT NULL,
  "received" varchar(15) NOT NULL,
  "amount" float NOT NULL,
  "due_date" date NOT NULL,
  "due_to" varchar(50) NOT NULL,
  "status" varchar(15) NOT NULL DEFAULT 'To pay',
  "create_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "settlements" (
  "id" varchar(36) PRIMARY KEY DEFAULT uuid_generate_v4(),
  "rate" varchar(32) NOT NULL,
  "employee" varchar(15) NOT NULL,
  "today" date NOT NULL,
  "monthly_salary" float NOT NULL,
  "last_salary" float NOT NULL,
  "total_salary" float NOT NULL,
  "end_date" date NOT NULL,
  "tenure" varchar(30) NOT NULL,
  "reason" varchar(30) NOT NULL,
  "total" float NOT NULL,
  "status" varchar(15) NOT NULL,
  "create_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);
CREATE TABLE "det_settlements" (
  "id" varchar(36) PRIMARY KEY,
  "settlement" varchar(32) NOT NULL,
  "item" varchar(50) NOT NULL,
  "days" integer NOT NULL,
  "daily_rate" float NOT NULL,
  "total" float NOT NULL
);
CREATE TABLE "benefits" (
  "id" varchar(36) PRIMARY KEY,
  "rate" varchar(4) NOT NULL,
  "employee" varchar(15) NOT NULL,
  "date" date NOT NULL,
  "monthly_salary" float NOT NULL,
  "vacation_bonus" float NOT NULL,
  "extra_hours" float NOT NULL,
  "util_salary" float NOT NULL,
  "utilities" float NOT NULL,
  "m_gross_salary" float NOT NULL,
  "d_gross_salary" float NOT NULL,
  "seniority" integer NOT NULL,
  "senior_extra" integer DEFAULT 0,
  "mensual_senior" float DEFAULT 0,
  "seniority_advances" float DEFAULT 0,
  "accumulated_seniority" float DEFAULT 0,
  "APR" float DEFAULT 0,
  "MPR" float DEFAULT 0,
  "interest_payments" float DEFAULT 0,
  "accrued_interest" float DEFAULT 0,
  "status" varchar(15) NOT NULL,
  "create_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);
CREATE TABLE "staff" (
  "id" varchar(36) PRIMARY KEY,
  "rate" varchar(4) NOT NULL,
  "employee" varchar(15) NOT NULL,
  "days" integer NOT NULL,
  "day_pay" float NOT NULL,
  "biweekly" float NOT NULL,
  "biweekly_pay" float NOT NULL,
  "hour_pay" float NOT NULL,
  "parking" float NOT NULL,
  "extra_work" float NOT NULL,
  "n_extra_days" integer NOT NULL,
  "rate_extra_days" float NOT NULL,
  "total_extra_days" float NOT NULL,
  "n_extra_hour" integer NOT NULL,
  "rate_extra_hour" float NOT NULL,
  "total_extra_hour" float NOT NULL,
  "gross_pay" float NOT NULL,
  "total_deductions" float NOT NULL,
  "net_pay" float NOT NULL,
  "debts" float DEFAULT 0,
  "total" float NOT NULL,
  "status" varchar(15) NOT NULL,
  "create_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);
CREATE TABLE "det_staff_bonus" (
  "id" varchar(36) PRIMARY KEY,
  "staff" varchar(32) NOT NULL,
  "name" varchar(50) NOT NULL,
  "amount" float NOT NULL
);
CREATE TABLE "det_staff_taxes" (
  "id" varchar(36) PRIMARY KEY,
  "staff" varchar(32) NOT NULL,
  "name" varchar(20) NOT NULL,
  "tax" float NOT NULL
);
CREATE TABLE "timebooks" (
  "id" varchar(36) PRIMARY KEY,
  "employee" varchar(15) NOT NULL,
  "date" date NOT NULL,
  "time_in" time NOT NULL,
  "time_out" time NOT NULL,
  "status" varchar(15) NOT NULL,
  "create_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);
ALTER TABLE "vacations"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "vacations"
ADD FOREIGN KEY ("rate") REFERENCES "exchangerates" ("symbol");
ALTER TABLE "det_vac_grosspay"
ADD FOREIGN KEY ("vacation") REFERENCES "vacations" ("id");
ALTER TABLE "det_vac_deduction"
ADD FOREIGN KEY ("vacation") REFERENCES "vacations" ("id");
ALTER TABLE "users"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "users"
ADD FOREIGN KEY ("role") REFERENCES "roles" ("id");
ALTER TABLE "loans"
ADD FOREIGN KEY ("authorized") REFERENCES "employees" ("id");
ALTER TABLE "loans"
ADD FOREIGN KEY ("received") REFERENCES "employees" ("id");
ALTER TABLE "loans"
ADD FOREIGN KEY ("rate") REFERENCES "exchangerates" ("symbol");
ALTER TABLE "timebooks"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "settlements"
ADD FOREIGN KEY ("rate") REFERENCES "exchangerates" ("symbol");
ALTER TABLE "settlements"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "det_settlements"
ADD FOREIGN KEY ("settlement") REFERENCES "settlements" ("id");
ALTER TABLE "benefits"
ADD FOREIGN KEY ("rate") REFERENCES "exchangerates" ("symbol");
ALTER TABLE "benefits"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "staff"
ADD FOREIGN KEY ("rate") REFERENCES "exchangerates" ("symbol");
ALTER TABLE "staff"
ADD FOREIGN KEY ("employee") REFERENCES "employees" ("id");
ALTER TABLE "det_staff_bonus"
ADD FOREIGN KEY ("staff") REFERENCES "staff" ("id");
ALTER TABLE "det_staff_taxes"
ADD FOREIGN KEY ("staff") REFERENCES "staff" ("id");