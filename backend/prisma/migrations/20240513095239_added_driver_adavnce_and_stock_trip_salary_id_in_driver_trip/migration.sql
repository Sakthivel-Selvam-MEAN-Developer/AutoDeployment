/*
  Warnings:

  - You are about to drop the column `tripSalaryId` on the `driverTrip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "driverSalary"."driverTrip" RENAME COLUMN "tripSalaryId" TO "unloadingTripSalaryId";
ALTER TABLE "driverSalary"."driverTrip" ADD COLUMN    "driverAdvance" INTEGER[], ADD COLUMN     "stockTripSalaryId" INTEGER;