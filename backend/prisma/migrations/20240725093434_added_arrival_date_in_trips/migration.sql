
-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "arrivalDate" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "arrivalDate" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "arrivalDate" INTEGER;
