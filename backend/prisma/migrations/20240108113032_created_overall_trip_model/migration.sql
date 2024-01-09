/*
  Warnings:

  - You are about to drop the column `stockPointToUnloadingPointTripId` on the `fuel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."fuel" DROP COLUMN "stockPointToUnloadingPointTripId",
ADD COLUMN     "overallTripId" INTEGER,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "subContract"."overallTrip" (
    "id" SERIAL NOT NULL,
    "loadingPointToStockPointTripId" INTEGER,
    "stockPointToUnloadingPointTripId" INTEGER,
    "loadingPointToUnloadingPointTripId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "overallTrip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_loadingPointToStockPointTripId_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_stockPointToUnloadingPointTripId_fkey" FOREIGN KEY ("stockPointToUnloadingPointTripId") REFERENCES "subContract"."stockPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_loadingPointToUnloadingPointTripId_fkey" FOREIGN KEY ("loadingPointToUnloadingPointTripId") REFERENCES "subContract"."loadingPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
