/*
  Warnings:

  - Added the required column `transporterType` to the `transporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "transporterType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "identity"."userRoles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" INTEGER NOT NULL,
    "employeeId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,

    CONSTRAINT "userRoles_pkey" PRIMARY KEY ("id")
);
