-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "acknowledgeDueTime" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "acknowledgeDueTime" INTEGER;
