/*
  Warnings:

  - You are about to drop the column `receivedAmount` on the `companyAdvisory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."companyAdvisory" DROP COLUMN "receivedAmount";

-- AlterTable
ALTER TABLE "subContract"."companyInvoice" ADD COLUMN     "receivedAmount" INTEGER;
