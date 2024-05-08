/*
  Warnings:

  - Added the required column `tripSalaryId` to the `driverTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driverSalary"."driverTrip" ADD COLUMN     "tripSalaryId" INTEGER NOT NULL;
