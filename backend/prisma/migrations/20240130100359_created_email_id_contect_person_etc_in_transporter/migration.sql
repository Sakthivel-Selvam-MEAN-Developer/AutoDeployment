/*
  Warnings:

  - You are about to drop the column `bankDetailsId` on the `transporter` table. All the data in the column will be lost.
  - You are about to drop the `bankDetails` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[emailId]` on the table `cementCompany` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailId]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactPersonNumber]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountNumber]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountHolder` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonName` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonNumber` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `transporter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifsc` to the `transporter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subContract"."transporter" DROP CONSTRAINT "transporter_bankDetailsId_fkey";

-- AlterTable
ALTER TABLE "subContract"."pricePoint" ALTER COLUMN "transporterPercentage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subContract"."transporter" DROP COLUMN "bankDetailsId",
ADD COLUMN     "accountHolder" TEXT NOT NULL,
ADD COLUMN     "accountNumber" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactPersonName" TEXT NOT NULL,
ADD COLUMN     "contactPersonNumber" TEXT NOT NULL,
ADD COLUMN     "emailId" TEXT NOT NULL,
ADD COLUMN     "ifsc" TEXT NOT NULL,
ALTER COLUMN "gstNumber" SET DATA TYPE TEXT,
ALTER COLUMN "tdsPercentage" DROP NOT NULL;

-- DropTable
DROP TABLE "subContract"."bankDetails";

-- CreateIndex
CREATE UNIQUE INDEX "cementCompany_emailId_key" ON "subContract"."cementCompany"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_emailId_key" ON "subContract"."transporter"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_contactPersonNumber_key" ON "subContract"."transporter"("contactPersonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_accountNumber_key" ON "subContract"."transporter"("accountNumber");
