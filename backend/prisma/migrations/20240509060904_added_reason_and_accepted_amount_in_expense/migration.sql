/*
  Warnings:

  - You are about to drop the column `amount` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `placedAmount` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driverSalary"."expenses" DROP COLUMN "amount",
ADD COLUMN     "acceptedAmount" INTEGER,
ADD COLUMN     "placedAmount" INTEGER NOT NULL,
ADD COLUMN     "rejectableReason" TEXT;
