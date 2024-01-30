/*
  Warnings:

  - You are about to drop the column `unloadedWeight` on the `loadingPointToUnloadingPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `unloadedWeight` on the `stockPointToUnloadingPointTrip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" DROP COLUMN "unloadedWeight";

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" DROP COLUMN "unloadedWeight";

-- CreateTable
CREATE TABLE "subContract"."shortageQuantity" (
    "id" SERIAL NOT NULL,
    "overallTripId" INTEGER NOT NULL,
    "shortageQuantity" INTEGER NOT NULL,
    "shortageAmount" INTEGER NOT NULL,
    "approvalStatus" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "filledLoad" INTEGER NOT NULL,
    "unloadedQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "shortageQuantity_pkey" PRIMARY KEY ("id")
);
