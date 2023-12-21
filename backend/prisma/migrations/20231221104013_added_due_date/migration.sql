/*
  Warnings:

  - You are about to drop the column `remainingBalance` on the `paymentDues` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `paymentDues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."paymentDues" DROP COLUMN "remainingBalance",
ADD COLUMN     "dueDate" INTEGER NOT NULL;
