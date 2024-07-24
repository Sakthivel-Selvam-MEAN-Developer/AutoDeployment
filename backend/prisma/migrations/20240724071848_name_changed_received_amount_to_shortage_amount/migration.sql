/*
  Warnings:

  - You are about to drop the column `companyAdvisoryId` on the `companyInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `companyInvoice` table. All the data in the column will be lost.
  - You are about to drop the column `receivedAmount` on the `companyInvoice` table. All the data in the column will be lost.
  - You are about to drop the `companyAdvisory` table. If the table is not empty, all the data it contains will be lost.

*/

-- DropForeignKey
ALTER TABLE "subContract"."companyInvoice" DROP CONSTRAINT "companyInvoice_companyAdvisoryId_fkey";

-- AlterTable
ALTER TABLE "subContract"."companyInvoice" DROP COLUMN "companyAdvisoryId";

-- RenameColumn
ALTER TABLE "subContract"."companyInvoice" RENAME COLUMN "paid" TO "received";

-- RenameColumn
ALTER TABLE "subContract"."companyInvoice" RENAME COLUMN "receivedAmount" TO "shortageAmount";


-- DropTable
DROP TABLE "subContract"."companyAdvisory";
