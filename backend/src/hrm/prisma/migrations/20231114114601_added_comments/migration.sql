/*
  Warnings:

  - Added the required column `comments` to the `leaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "leaves" ADD COLUMN     "comments" TEXT NOT NULL,
ADD COLUMN     "deniedComment" TEXT;
