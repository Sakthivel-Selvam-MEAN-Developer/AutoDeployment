-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "unloadedWeight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "tripStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "unloadedWeight" DOUBLE PRECISION;
