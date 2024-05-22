/*
  Warnings:

  - Added the required column `dieselkilometer` to the `fuel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingKilometer` to the `loadingPointToStockPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingKilometer` to the `loadingPointToUnloadingPointTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."fuel" ADD COLUMN     "dieselkilometer" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD COLUMN     "loadingKilometer" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unloadingKilometer" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "loadingKilometer" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unloadingKilometer" DOUBLE PRECISION;
