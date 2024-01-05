/*
  Warnings:

  - You are about to drop the column `transporterBalance` on the `loadingPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `filledLoad` on the `stockPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `stockPointId` on the `stockPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `truckId` on the `stockPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the `singleTrip` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `stockPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceNumber]` on the table `stockPointToUnloadingPointTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `margin` to the `loadingPointToStockPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFreightAmount` to the `loadingPointToStockPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransporterAmount` to the `loadingPointToStockPointTrip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_stockPointToUnloadingPointTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_loadingPointToStockPointTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_loadingPointToUnloadingPointTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_stockPointToUnloadingPointTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP CONSTRAINT "stockPointToUnloadingPointTrip_stockPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP CONSTRAINT "stockPointToUnloadingPointTrip_truckId_fkey";

-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "margin" INTEGER NOT NULL,
ADD COLUMN     "totalFreightAmount" INTEGER NOT NULL,
ADD COLUMN     "totalTransporterAmount" INTEGER NOT NULL,
ADD COLUMN     "wantFuel" BOOLEAN;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" DROP COLUMN "transporterBalance";

-- AlterTable
ALTER TABLE "subContract"."pricePoint" ADD COLUMN     "stockPointId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP COLUMN "filledLoad",
DROP COLUMN "stockPointId",
DROP COLUMN "truckId",
ADD COLUMN     "loadingPointToStockPointTripId" INTEGER,
ADD COLUMN     "tripStatus" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "subContract"."singleTrip";

-- CreateIndex
CREATE UNIQUE INDEX "stockPoint_name_key" ON "subContract"."stockPoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stockPointToUnloadingPointTrip_invoiceNumber_key" ON "subContract"."stockPointToUnloadingPointTrip"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_loadingPointToStockPointTri_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
