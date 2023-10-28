-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "loconavDevice" (
                                 "id" SERIAL NOT NULL,
                                 "traccarId" INTEGER NOT NULL,
                                 "vehicleId" INTEGER NOT NULL,
                                 "loconavToken" TEXT NOT NULL,
                                 "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 "updatedAt" TIMESTAMPTZ(6) NOT NULL,

                                 CONSTRAINT "loconavDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicleMovements" (
                                    "id" SERIAL NOT NULL,
                                    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
                                    "eventTime" INTEGER NOT NULL,
                                    "latitude" DOUBLE PRECISION NOT NULL,
                                    "longitude" DOUBLE PRECISION NOT NULL,
                                    "source" TEXT NOT NULL,
                                    "speed" DOUBLE PRECISION NOT NULL,
                                    "vehicleId" INTEGER NOT NULL,

                                    CONSTRAINT "vehicleMovements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_traccarId_key" ON "loconavDevice"("traccarId");

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_vehicleId_key" ON "loconavDevice"("vehicleId");

-- AddForeignKey
ALTER TABLE "loconavDevice" ADD CONSTRAINT "loconavDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicleMovements" ADD CONSTRAINT "vehicleMovements_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CREATE EXTENSION IF NOT EXISTS timescaledb;
-- CREATE EXTENSION IF NOT EXISTS postgis;

-- CREATE EXTENSION IF NOT EXISTS timescaledb;
-- CREATE EXTENSION IF NOT EXISTS postgis;
--
-- SELECT create_hypertable('vehicleMovements', by_range('eventTime'));
--
-- CREATE INDEX ix_vehicle_id_on ON "vehicleMovements" ("vehicleId", "eventTime" DESC);
