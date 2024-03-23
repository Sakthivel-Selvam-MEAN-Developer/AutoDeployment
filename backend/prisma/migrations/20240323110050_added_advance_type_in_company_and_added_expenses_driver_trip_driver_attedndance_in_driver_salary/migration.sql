-- CreateEnum
CREATE TYPE "driverSalary"."expensesType" AS ENUM ('LOADING_CHARGES', 'UNLOADING_CHARGES', 'TOLL_EXPENSES', 'TRIP_ALLOWANCE', 'CASE_SLIP_EXPENSES', 'ROUTE_ALLOWANCES', 'OFFICE_EXPENSES', 'GREASING_CHARGES', 'AIR_CHECKUP_CHARGES', 'TOOLS_SPARES_CHARGES', 'WORKSHOP_SHOWROOM_CHARGES', 'PHONE_ATM_CHARGES', 'EMAIL_CHRGES', 'PUNCTURE_CHARGES', 'PARKING_CHARGES', 'WEIGHT_BRIDGE_CHARGES', 'OIL_CHARGES', 'ADBLUE_OIL_CHARGES', 'MECHANICAL_EXPENSES', 'SAFETY_EXEPENSES', 'ELECTRICAL_EXPENSES', 'MISCELLANCEOUS_EXPENSES');

-- AlterTable
ALTER TABLE "subContract"."cementCompany" ADD COLUMN     "advanceType" INTEGER NOT NULL DEFAULT 70;

-- CreateTable
CREATE TABLE "driverSalary"."driverTrip" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "tripStartDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "driverTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."driverAttendance" (
    "id" SERIAL NOT NULL,
    "date" INTEGER NOT NULL,
    "driverPresence" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "driverAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."expenses" (
    "id" SERIAL NOT NULL,
    "expenseType" "driverSalary"."expensesType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "expenseApproval" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "driverSalary"."driverTrip" ADD CONSTRAINT "driverTrip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driverSalary"."driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driverSalary"."driverAttendance" ADD CONSTRAINT "driverAttendance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driverSalary"."driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
