-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "line1" TEXT,
    "line2" TEXT,
    "line3" TEXT,
    "pincode" BIGINT,
    "state" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
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
    "addressId" INTEGER,
    "contactPersonId" INTEGER,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "mobile" BIGINT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
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
CREATE TABLE "stopReasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stopReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stops" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stopReasonsId" INTEGER NOT NULL,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people" ADD CONSTRAINT "people_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_stopReasonsId_fkey" FOREIGN KEY ("stopReasonsId") REFERENCES "stopReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
