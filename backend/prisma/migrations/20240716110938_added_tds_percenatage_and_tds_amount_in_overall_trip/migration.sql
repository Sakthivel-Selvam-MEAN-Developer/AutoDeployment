-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "subContract"."overallTrip" ADD COLUMN     "tdsAmount" INTEGER,
ADD COLUMN     "tdsPercenatage" INTEGER;
