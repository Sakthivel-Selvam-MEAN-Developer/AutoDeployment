/*
  Warnings:

  - Added the required column `branchName` to the `transporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "branchName" TEXT NOT NULL;
