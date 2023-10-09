-- CreateTable
CREATE TABLE "gpsStops" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "durationInMillis" INTEGER NOT NULL,
    "vehiclesId" INTEGER,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "gpsStops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gpsStops" ADD CONSTRAINT "gpsStops_vehiclesId_fkey" FOREIGN KEY ("vehiclesId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
