-- CreateTable
CREATE TABLE "traccarDevice" (
    "id" SERIAL NOT NULL,
    "traccarId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "traccarDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_traccarId_key" ON "traccarDevice"("traccarId");

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_vehicleId_key" ON "traccarDevice"("vehicleId");

-- AddForeignKey
ALTER TABLE "traccarDevice" ADD CONSTRAINT "traccarDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
