/*
  Warnings:

  - Added the required column `vehicleNumber` to the `fuel` table without a default value. This is not possible if the table is not empty.
  - Made the column `fuelStationId` on table `fuel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_fuelStationId_fkey";

-- AlterTable
ALTER TABLE "subContract"."fuel" ADD COLUMN     "vehicleNumber" TEXT NOT NULL,
ALTER COLUMN "fuelStationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_fuelStationId_fkey" FOREIGN KEY ("fuelStationId") REFERENCES "subContract"."fuelStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
