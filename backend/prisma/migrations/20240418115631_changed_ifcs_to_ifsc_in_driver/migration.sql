/*
  Warnings:

  - You are about to drop the column `ifcsCode` on the `driver` table. All the data in the column will be lost.
  - Added the required column `ifscCode` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driverSalary"."driver" DROP COLUMN "ifcsCode",
ADD COLUMN     "ifscCode" TEXT NOT NULL;
