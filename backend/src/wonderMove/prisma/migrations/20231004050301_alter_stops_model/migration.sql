/*
  Warnings:

  - You are about to drop the column `location` on the `stops` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `stops` table. All the data in the column will be lost.
  - Added the required column `gpsStopId` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stops" DROP CONSTRAINT "stops_vehicleId_fkey";

-- AlterTable
ALTER TABLE "stops" DROP COLUMN "location",
DROP COLUMN "vehicleId",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "gpsStopId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_gpsStopId_fkey" FOREIGN KEY ("gpsStopId") REFERENCES "gpsStops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
