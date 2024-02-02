/*
  Warnings:

  - Added the required column `invoiceNumber` to the `paymentDues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountTypeNumber` to the `transporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."paymentDues" ADD COLUMN     "invoiceNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "accountTypeNumber" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "subContract"."accountType" (
    "id" SERIAL NOT NULL,
    "accountTypeName" TEXT NOT NULL,
    "accountTypeNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "accountType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accountType_accountTypeName_key" ON "subContract"."accountType"("accountTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "accountType_accountTypeNumber_key" ON "subContract"."accountType"("accountTypeNumber");
