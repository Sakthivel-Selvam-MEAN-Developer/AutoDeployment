/*
  Warnings:

  - A unique constraint covering the columns `[aadharNumber]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[panNumber]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "aadharNumber" TEXT,
ADD COLUMN     "panNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "transporter_aadharNumber_key" ON "subContract"."transporter"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_panNumber_key" ON "subContract"."transporter"("panNumber");
