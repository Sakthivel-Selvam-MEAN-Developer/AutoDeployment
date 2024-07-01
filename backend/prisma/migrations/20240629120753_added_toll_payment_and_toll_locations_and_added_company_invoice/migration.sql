 -- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- CreateTable
CREATE TABLE "subContract"."companyInvoice" (
    "id" SERIAL NOT NULL,
    "billNo" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "billDate" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "companyInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."tollPayment" (
    "id" SERIAL NOT NULL,
    "overallTripId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "billNo" TEXT,
    "billDate" INTEGER,
    "tollPlazaLocationId" INTEGER,
    "billedStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."tollPlazaLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPlazaLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."companyInvoice" ADD CONSTRAINT "companyInvoice_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."tollPayment" ADD CONSTRAINT "tollPayment_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."tollPayment" ADD CONSTRAINT "tollPayment_tollPlazaLocationId_fkey" FOREIGN KEY ("tollPlazaLocationId") REFERENCES "subContract"."tollPlazaLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
