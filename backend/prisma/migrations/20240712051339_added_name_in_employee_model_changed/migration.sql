/*
  Warnings:

  - Added the required column `name` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."employee" ADD COLUMN     "name" TEXT NOT NULL;
