/*
  Warnings:

  - A unique constraint covering the columns `[vehiclesId,startTime]` on the table `gpsStops` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gpsStops_vehiclesId_startTime_key" ON "gpsStops"("vehiclesId", "startTime");
