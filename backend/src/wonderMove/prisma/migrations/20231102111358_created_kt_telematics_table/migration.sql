-- CreateTable
CREATE TABLE "ktTelematicsDevice" (
    "id" SERIAL NOT NULL,
    "ktTelematicsDeviceId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "ktTelematicsToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ktTelematicsDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_ktTelematicsDeviceId_key" ON "ktTelematicsDevice"("ktTelematicsDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_vehicleId_key" ON "ktTelematicsDevice"("vehicleId");

-- AddForeignKey
ALTER TABLE "ktTelematicsDevice" ADD CONSTRAINT "ktTelematicsDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
