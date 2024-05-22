-- AlterTable
ALTER TABLE "subContract"."fuel" ADD COLUMN     "dieselkilometer" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "loadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unloadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "loadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "unloadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0;
