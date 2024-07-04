/*
  Warnings:

  - A unique constraint covering the columns `[overallTripId,type]` on the table `paymentDues` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "approvedFreightAmount" DOUBLE PRECISION,
ADD COLUMN     "billingRate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "approvedFreightAmount" DOUBLE PRECISION,
ADD COLUMN     "billingRate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "billingRate" DOUBLE PRECISION;

