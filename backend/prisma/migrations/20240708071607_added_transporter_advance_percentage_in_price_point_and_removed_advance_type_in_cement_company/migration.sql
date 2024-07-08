/*
  Warnings:

  - You are about to drop the column `advanceType` on the `cementCompany` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."cementCompany" DROP COLUMN "advanceType";

-- AlterTable
ALTER TABLE "subContract"."pricePoint" ADD COLUMN     "transporterAdvancePercentage" INTEGER NOT NULL DEFAULT 70;
