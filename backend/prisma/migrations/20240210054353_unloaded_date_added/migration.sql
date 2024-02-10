/*
  Warnings:

  - Added the required column `unloadedDate` to the `shortageQuantity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."shortageQuantity" ADD COLUMN     "unloadedDate" INTEGER NOT NULL;
