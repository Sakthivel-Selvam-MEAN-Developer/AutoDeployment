/*
  Warnings:

  - You are about to drop the column `bunkLocation` on the `bunk` table. All the data in the column will be lost.
  - You are about to drop the column `bunkId` on the `fuel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `loadingPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `unloadingPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_bunkId_fkey";

-- AlterTable
ALTER TABLE "subContract"."bunk" DROP COLUMN "bunkLocation";

-- AlterTable
ALTER TABLE "subContract"."fuel" DROP COLUMN "bunkId",
ADD COLUMN     "fuelStationId" INTEGER,
ALTER COLUMN "pricePerliter" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalprice" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "subContract"."fuelStation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "bunkId" INTEGER NOT NULL,

    CONSTRAINT "fuelStation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "loadingPoint_name_key" ON "subContract"."loadingPoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unloadingPoint_name_key" ON "subContract"."unloadingPoint"("name");

-- AddForeignKey
ALTER TABLE "subContract"."fuelStation" ADD CONSTRAINT "fuelStation_bunkId_fkey" FOREIGN KEY ("bunkId") REFERENCES "subContract"."bunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_fuelStationId_fkey" FOREIGN KEY ("fuelStationId") REFERENCES "subContract"."fuelStation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
