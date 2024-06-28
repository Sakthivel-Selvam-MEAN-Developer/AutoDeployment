-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "companyInvoiceId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_pkey" TO "tollPayment_pkey";

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

-- RenameForeignKey
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_overallTripId_fkey" TO "tollPayment_overallTripId_fkey";

-- RenameForeignKey
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_tollPlazaLocationId_fkey" TO "tollPayment_tollPlazaLocationId_fkey";

-- AddForeignKey
ALTER TABLE "subContract"."companyInvoice" ADD CONSTRAINT "companyInvoice_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
