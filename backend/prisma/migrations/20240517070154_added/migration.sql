-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "lrNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "partyName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "lrNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "partyName" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD COLUMN     "lrNumber" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "partyName" TEXT NOT NULL DEFAULT '';
