-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "subContract";

-- CreateTable
CREATE TABLE "subContract"."transporter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hasGst" BOOLEAN NOT NULL DEFAULT false,
    "gstNumber" INTEGER,
    "tdsPercentage" INTEGER NOT NULL,
    "bankDetailsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."bankDetails" (
    "id" SERIAL NOT NULL,
    "accountHolder" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "ifsc" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "bankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."cementCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "cementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."factory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."stockPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "stockPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."deliveryPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "deliveryPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."factoryToStockPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stockPointId" INTEGER NOT NULL,
    "truckId" INTEGER,

    CONSTRAINT "factoryToStockPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."stockToCustomerPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stockPointId" INTEGER NOT NULL,
    "deliveryPointId" INTEGER,
    "truckId" INTEGER,

    CONSTRAINT "stockToCustomerPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."factoryToCustomerTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "deliveryPointId" INTEGER NOT NULL,
    "truckId" INTEGER,

    CONSTRAINT "factoryToCustomerTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."singleTrip" (
    "id" SERIAL NOT NULL,
    "stockToCustomerTripId" INTEGER NOT NULL,
    "factoryToStockTripId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "factoryToCustomerTripId" INTEGER NOT NULL,

    CONSTRAINT "singleTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."bunk" (
    "id" SERIAL NOT NULL,
    "bunkName" TEXT NOT NULL,
    "bunkLocation" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "bunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."fuel" (
    "id" SERIAL NOT NULL,
    "pricePerliter" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalprice" INTEGER NOT NULL,
    "factoryToStockTripId" INTEGER,
    "stockToCustomerTripId" INTEGER,
    "bunkId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "factoryToCustomerTripId" INTEGER,

    CONSTRAINT "fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."truck" (
    "id" SERIAL NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "transporterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."transporter" ADD CONSTRAINT "transporter_bankDetailsId_fkey" FOREIGN KEY ("bankDetailsId") REFERENCES "subContract"."bankDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factory" ADD CONSTRAINT "factory_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPoint" ADD CONSTRAINT "stockPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."deliveryPoint" ADD CONSTRAINT "deliveryPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" ADD CONSTRAINT "factoryToStockPointTrip_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "subContract"."factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" ADD CONSTRAINT "factoryToStockPointTrip_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" ADD CONSTRAINT "factoryToStockPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" ADD CONSTRAINT "stockToCustomerPointTrip_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" ADD CONSTRAINT "stockToCustomerPointTrip_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "subContract"."deliveryPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" ADD CONSTRAINT "stockToCustomerPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" ADD CONSTRAINT "factoryToCustomerTrip_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "subContract"."factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" ADD CONSTRAINT "factoryToCustomerTrip_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "subContract"."deliveryPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" ADD CONSTRAINT "factoryToCustomerTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_stockToCustomerTripId_fkey" FOREIGN KEY ("stockToCustomerTripId") REFERENCES "subContract"."stockToCustomerPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_factoryToStockTripId_fkey" FOREIGN KEY ("factoryToStockTripId") REFERENCES "subContract"."factoryToStockPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_factoryToCustomerTripId_fkey" FOREIGN KEY ("factoryToCustomerTripId") REFERENCES "subContract"."factoryToCustomerTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_factoryToStockTripId_fkey" FOREIGN KEY ("factoryToStockTripId") REFERENCES "subContract"."factoryToStockPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_stockToCustomerTripId_fkey" FOREIGN KEY ("stockToCustomerTripId") REFERENCES "subContract"."stockToCustomerPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_bunkId_fkey" FOREIGN KEY ("bunkId") REFERENCES "subContract"."bunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_factoryToCustomerTripId_fkey" FOREIGN KEY ("factoryToCustomerTripId") REFERENCES "subContract"."factoryToCustomerTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."truck" ADD CONSTRAINT "truck_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "subContract"."transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
