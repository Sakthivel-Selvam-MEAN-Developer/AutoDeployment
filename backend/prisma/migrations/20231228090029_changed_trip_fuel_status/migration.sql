-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ALTER COLUMN "wantFuel" DROP NOT NULL,
ALTER COLUMN "wantFuel" DROP DEFAULT;
