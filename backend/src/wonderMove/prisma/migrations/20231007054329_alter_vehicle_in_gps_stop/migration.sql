/*
  Warnings:

  - Made the column `vehicleId` on table `gpsStops` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "gpsStops" DROP CONSTRAINT "gpsStops_vehicleId_fkey";

-- AlterTable
ALTER TABLE "gpsStops" ALTER COLUMN "vehicleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "gpsStops" ADD CONSTRAINT "gpsStops_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
