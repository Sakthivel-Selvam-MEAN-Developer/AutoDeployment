/*
  Warnings:

  - Made the column `loadingPointToStockPointTripId` on table `stockPointToUnloadingPointTrip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP CONSTRAINT "stockPointToUnloadingPointTrip_loadingPointToStockPointTri_fkey";

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ALTER COLUMN "loadingPointToStockPointTripId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_loadingPointToStockPointTri_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
