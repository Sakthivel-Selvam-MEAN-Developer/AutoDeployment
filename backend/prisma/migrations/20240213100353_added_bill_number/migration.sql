-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "billNo" TEXT;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "billNo" TEXT;

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "billNo" TEXT;
