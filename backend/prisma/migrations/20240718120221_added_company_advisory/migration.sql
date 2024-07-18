-- AlterTable
ALTER TABLE "subContract"."cementCompany" ADD COLUMN     "paymentOffSetDays" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."companyInvoice" ADD COLUMN     "companyAdvisoryId" INTEGER,
ADD COLUMN     "dueDate" INTEGER;

-- CreateTable
CREATE TABLE "subContract"."companyAdvisory" (
    "id" SERIAL NOT NULL,
    "bankReferenceNumber" TEXT NOT NULL,
    "paymentDocumentNumber" TEXT NOT NULL,
    "paymentReceivedDate" INTEGER NOT NULL,
    "receivedAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "companyAdvisory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."companyInvoice" ADD CONSTRAINT "companyInvoice_companyAdvisoryId_fkey" FOREIGN KEY ("companyAdvisoryId") REFERENCES "subContract"."companyAdvisory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
