-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "identity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "peopleOrg";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "wonderMove";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "wonderMove"."customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "pan" TEXT,
    "gst" TEXT,
    "iGst" TEXT,
    "sGst" TEXT,
    "cGst" TEXT,
    "isGstBilling" BOOLEAN,
    "ourVendorCode" TEXT,
    "isTDSApplicable" BOOLEAN,
    "tdsPercentage" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "contactPersonId" INTEGER,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "AddressLine3" TEXT,
    "pincode" BIGINT,
    "state" TEXT,
    "city" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."people" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "mobile" BIGINT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."vehicles" (
    "id" SERIAL NOT NULL,
    "number" TEXT,
    "make" TEXT,
    "type" TEXT,
    "ownershipType" TEXT,
    "ownerName" TEXT,
    "insuranceExpiryDate" TIMESTAMPTZ(6),
    "taxExpiryDate" TIMESTAMPTZ(6),
    "npPermitDate" TIMESTAMPTZ(6),
    "fiveYearPermitDate" TIMESTAMPTZ(6),
    "fcDate" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."traccarDevice" (
    "id" SERIAL NOT NULL,
    "traccarId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "traccarDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."loconavDevice" (
    "id" SERIAL NOT NULL,
    "loconavDeviceId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "loconavToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "loconavDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."ktTelematicsDevice" (
    "id" SERIAL NOT NULL,
    "ktTelematicsDeviceId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "ktTelematicsToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ktTelematicsDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."stopReasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stopReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."stops" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "durationInMillis" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "stopReasonId" INTEGER NOT NULL,
    "gpsStopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."gpsStops" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "durationInMillis" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "gpsStops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."vehicleMovements" (
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

-- CreateTable
CREATE TABLE "peopleOrg"."leaveReasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "leaveReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."leaves" (
    "id" SERIAL NOT NULL,
    "appliedOn" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "isFromHalfDay" BOOLEAN NOT NULL,
    "isToHalfDay" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "approval" BOOLEAN,
    "comments" TEXT NOT NULL,
    "deniedComment" TEXT,
    "leaveReasonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "employeesId" TEXT,

    CONSTRAINT "leaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "orgUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."employees" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "orgUnitId" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnitHeads" (
    "id" SERIAL NOT NULL,
    "orgUnitsId" INTEGER,
    "employeesId" INTEGER,

    CONSTRAINT "orgUnitHeads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_name_key" ON "wonderMove"."customers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_contactPersonId_key" ON "wonderMove"."customers"("contactPersonId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_number_key" ON "wonderMove"."vehicles"("number");

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_traccarId_key" ON "wonderMove"."traccarDevice"("traccarId");

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_vehicleId_key" ON "wonderMove"."traccarDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_loconavDeviceId_key" ON "wonderMove"."loconavDevice"("loconavDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_vehicleId_key" ON "wonderMove"."loconavDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_ktTelematicsDeviceId_key" ON "wonderMove"."ktTelematicsDevice"("ktTelematicsDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_vehicleId_key" ON "wonderMove"."ktTelematicsDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "stopReasons_name_key" ON "wonderMove"."stopReasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gpsStops_vehicleId_startTime_key" ON "wonderMove"."gpsStops"("vehicleId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "leaveReasons_name_key" ON "peopleOrg"."leaveReasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orgUnits_name_key" ON "peopleOrg"."orgUnits"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeId_key" ON "peopleOrg"."employees"("employeeId");

-- AddForeignKey
ALTER TABLE "wonderMove"."customers" ADD CONSTRAINT "customers_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "wonderMove"."people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."traccarDevice" ADD CONSTRAINT "traccarDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."loconavDevice" ADD CONSTRAINT "loconavDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."ktTelematicsDevice" ADD CONSTRAINT "ktTelematicsDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."stops" ADD CONSTRAINT "stops_stopReasonId_fkey" FOREIGN KEY ("stopReasonId") REFERENCES "wonderMove"."stopReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."stops" ADD CONSTRAINT "stops_gpsStopId_fkey" FOREIGN KEY ("gpsStopId") REFERENCES "wonderMove"."gpsStops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."gpsStops" ADD CONSTRAINT "gpsStops_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."vehicleMovements" ADD CONSTRAINT "vehicleMovements_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."leaves" ADD CONSTRAINT "leaves_leaveReasonId_fkey" FOREIGN KEY ("leaveReasonId") REFERENCES "peopleOrg"."leaveReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."leaves" ADD CONSTRAINT "leaves_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "peopleOrg"."employees"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."employees" ADD CONSTRAINT "employees_orgUnitId_fkey" FOREIGN KEY ("orgUnitId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_orgUnitsId_fkey" FOREIGN KEY ("orgUnitsId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "peopleOrg"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
