/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber]` on the table `fuel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fueledDate` to the `fuel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `fuel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."fuel" ADD COLUMN     "fueledDate" INTEGER NOT NULL,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "hasTds" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "fuel_invoiceNumber_key" ON "subContract"."fuel"("invoiceNumber");
