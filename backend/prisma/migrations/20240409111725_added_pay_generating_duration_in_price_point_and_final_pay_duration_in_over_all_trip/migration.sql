-- AlterTable
ALTER TABLE "subContract"."overallTrip" ADD COLUMN     "finalPayDuration" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subContract"."pricePoint" ADD COLUMN     "payGeneratingDuration" INTEGER NOT NULL DEFAULT 0;
