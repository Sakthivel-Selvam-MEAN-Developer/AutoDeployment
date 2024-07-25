/*
  Warnings:

  - A unique constraint covering the columns `[billNo]` on the table `companyInvoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateExtension
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateIndex
CREATE UNIQUE INDEX "companyInvoice_billNo_key" ON "subContract"."companyInvoice"("billNo");
