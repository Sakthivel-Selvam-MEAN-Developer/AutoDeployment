/*
  Warnings:

  - You are about to drop the column `primaryBillNumber` on the `cementCompany` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryBillNumber` on the `cementCompany` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."cementCompany" DROP COLUMN "primaryBillNumber",
DROP COLUMN "secondaryBillNumber",
ADD COLUMN     "primaryBillId" INTEGER,
ADD COLUMN     "secondaryBillId" INTEGER;

-- CreateTable
CREATE TABLE "subContract"."companyBillingDetails" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "companyBillingDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."cementCompany" ADD CONSTRAINT "cementCompany_primaryBillId_fkey" FOREIGN KEY ("primaryBillId") REFERENCES "subContract"."companyBillingDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."cementCompany" ADD CONSTRAINT "cementCompany_secondaryBillId_fkey" FOREIGN KEY ("secondaryBillId") REFERENCES "subContract"."companyBillingDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
