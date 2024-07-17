/*
  Warnings:

  - Added the required column `GSTAmount` to the `companyInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TDSAmount` to the `companyInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."companyInvoice" ADD COLUMN     "GSTAmount" INTEGER NOT NULL,
ADD COLUMN     "TDSAmount" INTEGER NOT NULL;
