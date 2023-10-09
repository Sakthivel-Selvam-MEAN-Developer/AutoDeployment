/*
  Warnings:

  - You are about to drop the column `vehiclesId` on the `gpsStops` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vehicleId,startTime]` on the table `gpsStops` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "gpsStops" DROP CONSTRAINT "gpsStops_vehiclesId_fkey";

-- DropIndex
DROP INDEX "gpsStops_vehiclesId_startTime_key";

-- AlterTable
ALTER TABLE "gpsStops" DROP COLUMN "vehiclesId",
ADD COLUMN     "vehicleId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "gpsStops_vehicleId_startTime_key" ON "gpsStops"("vehicleId", "startTime");

-- AddForeignKey
ALTER TABLE "gpsStops" ADD CONSTRAINT "gpsStops_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
