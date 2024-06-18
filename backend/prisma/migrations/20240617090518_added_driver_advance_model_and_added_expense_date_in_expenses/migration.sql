-- AlterTable
ALTER TABLE "driverSalary"."expenses" ADD COLUMN     "expenseDate" INTEGER;

-- CreateTable
CREATE TABLE "driverSalary"."driverAdvance" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "advanceDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverTripId" INTEGER NOT NULL,

    CONSTRAINT "driverAdvance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "driverSalary"."driverAdvance" ADD CONSTRAINT "driverAdvance_driverTripId_fkey" FOREIGN KEY ("driverTripId") REFERENCES "driverSalary"."driverTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
