/*
  Warnings:

  - You are about to drop the column `paidAmount` on the `paymentDues` table. All the data in the column will be lost.
  - You are about to drop the column `transporterName` on the `paymentDues` table. All the data in the column will be lost.
  - Added the required column `name` to the `paymentDues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payableAmount` to the `paymentDues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."paymentDues" DROP COLUMN "paidAmount",
DROP COLUMN "transporterName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "payableAmount" INTEGER NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "transactionId" DROP NOT NULL,
ALTER COLUMN "paidAt" DROP NOT NULL;
