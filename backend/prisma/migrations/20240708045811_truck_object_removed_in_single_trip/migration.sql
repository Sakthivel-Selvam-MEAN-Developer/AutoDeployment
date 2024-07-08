/*
  Warnings:

  - You are about to drop the column `truckId` on the `loadingPointToStockPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `truckId` on the `loadingPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `truckId` on the `stockPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[overallTripId,type]` on the table `paymentDues` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" DROP CONSTRAINT "loadingPointToStockPointTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" DROP CONSTRAINT "loadingPointToUnloadingPointTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP CONSTRAINT "stockPointToUnloadingPointTrip_truckId_fkey";

-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" DROP COLUMN "truckId";

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" DROP COLUMN "truckId";

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP COLUMN "truckId";

-- CreateIndex
-- CREATE UNIQUE INDEX "paymentDues_overallTripId_type_key" ON "subContract"."paymentDues"("overallTripId", "type");
