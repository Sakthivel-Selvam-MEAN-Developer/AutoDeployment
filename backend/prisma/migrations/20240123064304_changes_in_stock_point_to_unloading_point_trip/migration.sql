/*
  Warnings:

  - Added the required column `totalFreightAmount` to the `stockPointToUnloadingPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransporterAmount` to the `stockPointToUnloadingPointTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "totalFreightAmount" INTEGER NOT NULL,
ADD COLUMN     "totalTransporterAmount" INTEGER NOT NULL;
