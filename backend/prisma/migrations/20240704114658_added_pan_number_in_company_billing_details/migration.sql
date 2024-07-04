/*
  Warnings:

  - A unique constraint covering the columns `[overallTripId,type]` on the table `paymentDues` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subContract"."companyBillingDetails" ADD COLUMN     "panNumber" TEXT;
