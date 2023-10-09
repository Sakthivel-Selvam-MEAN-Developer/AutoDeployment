/*
  Warnings:

  - You are about to drop the column `addressId` on the `people` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "people" DROP CONSTRAINT "people_addressId_fkey";

-- AlterTable
ALTER TABLE "people" DROP COLUMN "addressId";
