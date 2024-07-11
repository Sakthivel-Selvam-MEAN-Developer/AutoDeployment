/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `bunk` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactPersonNumber]` on the table `bunk` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subContract"."bunk" ADD COLUMN     "bunkType" TEXT,
ADD COLUMN     "contactPersonName" TEXT,
ADD COLUMN     "contactPersonNumber" INTEGER,
ADD COLUMN     "creaditDays" INTEGER,
ADD COLUMN     "emailId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "bunk_emailId_key" ON "subContract"."bunk"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "bunk_contactPersonNumber_key" ON "subContract"."bunk"("contactPersonNumber");
