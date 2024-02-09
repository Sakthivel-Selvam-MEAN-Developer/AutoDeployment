/*
  Warnings:

  - Added the required column `csmName` to the `transporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "csmName" TEXT NOT NULL;
