/*
  Warnings:

  - You are about to drop the column `loadingPointToStockPointTripId` on the `fuel` table. All the data in the column will be lost.
  - You are about to drop the column `loadingPointToUnloadingPointTripId` on the `fuel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_loadingPointToStockPointTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_loadingPointToUnloadingPointTripId_fkey";

-- AlterTable
ALTER TABLE "subContract"."fuel" DROP COLUMN "loadingPointToStockPointTripId",
DROP COLUMN "loadingPointToUnloadingPointTripId";
