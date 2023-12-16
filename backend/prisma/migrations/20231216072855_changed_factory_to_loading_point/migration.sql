/*
  Warnings:

  - You are about to drop the column `factoryToCustomerTripId` on the `fuel` table. All the data in the column will be lost.
  - You are about to drop the column `factoryToStockTripId` on the `fuel` table. All the data in the column will be lost.
  - You are about to drop the column `stockToCustomerTripId` on the `fuel` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryPointId` on the `pricePoint` table. All the data in the column will be lost.
  - You are about to drop the column `factoryId` on the `pricePoint` table. All the data in the column will be lost.
  - You are about to drop the column `factoryToCustomerTripId` on the `singleTrip` table. All the data in the column will be lost.
  - You are about to drop the column `factoryToStockTripId` on the `singleTrip` table. All the data in the column will be lost.
  - You are about to drop the column `stockToCustomerTripId` on the `singleTrip` table. All the data in the column will be lost.
  - You are about to drop the `deliveryPoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factoryToCustomerTrip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factoryToStockPointTrip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockToCustomerPointTrip` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `loadingPointId` to the `pricePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unloadingPointId` to the `pricePoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingPointToStockPointTripId` to the `singleTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loadingPointToUnloadingPointTripId` to the `singleTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockPointToUnloadingPointTripId` to the `singleTrip` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subContract"."deliveryPoint" DROP CONSTRAINT "deliveryPoint_cementCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factory" DROP CONSTRAINT "factory_cementCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" DROP CONSTRAINT "factoryToCustomerTrip_deliveryPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" DROP CONSTRAINT "factoryToCustomerTrip_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" DROP CONSTRAINT "factoryToCustomerTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" DROP CONSTRAINT "factoryToStockPointTrip_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" DROP CONSTRAINT "factoryToStockPointTrip_stockPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" DROP CONSTRAINT "factoryToStockPointTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_factoryToCustomerTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_factoryToStockTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_stockToCustomerTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."pricePoint" DROP CONSTRAINT "pricePoint_deliveryPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."pricePoint" DROP CONSTRAINT "pricePoint_factoryId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_factoryToCustomerTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_factoryToStockTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."singleTrip" DROP CONSTRAINT "singleTrip_stockToCustomerTripId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP CONSTRAINT "stockToCustomerPointTrip_deliveryPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP CONSTRAINT "stockToCustomerPointTrip_stockPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP CONSTRAINT "stockToCustomerPointTrip_truckId_fkey";

-- AlterTable
ALTER TABLE "subContract"."fuel" DROP COLUMN "factoryToCustomerTripId",
DROP COLUMN "factoryToStockTripId",
DROP COLUMN "stockToCustomerTripId",
ADD COLUMN     "loadingPointToStockPointTripId" INTEGER,
ADD COLUMN     "loadingPointToUnloadingPointTripId" INTEGER,
ADD COLUMN     "stockPointToUnloadingPointTripId" INTEGER;

-- AlterTable
ALTER TABLE "subContract"."pricePoint" DROP COLUMN "deliveryPointId",
DROP COLUMN "factoryId",
ADD COLUMN     "loadingPointId" INTEGER NOT NULL,
ADD COLUMN     "unloadingPointId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."singleTrip" DROP COLUMN "factoryToCustomerTripId",
DROP COLUMN "factoryToStockTripId",
DROP COLUMN "stockToCustomerTripId",
ADD COLUMN     "loadingPointToStockPointTripId" INTEGER NOT NULL,
ADD COLUMN     "loadingPointToUnloadingPointTripId" INTEGER NOT NULL,
ADD COLUMN     "stockPointToUnloadingPointTripId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "subContract"."deliveryPoint";

-- DropTable
DROP TABLE "subContract"."factory";

-- DropTable
DROP TABLE "subContract"."factoryToCustomerTrip";

-- DropTable
DROP TABLE "subContract"."factoryToStockPointTrip";

-- DropTable
DROP TABLE "subContract"."stockToCustomerPointTrip";

-- CreateTable
CREATE TABLE "subContract"."loadingPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "loadingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."unloadingPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,

    CONSTRAINT "unloadingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."loadingPointToStockPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "freightAmount" INTEGER NOT NULL,
    "transporterAmount" INTEGER NOT NULL,
    "loadingPointId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stockPointId" INTEGER NOT NULL,
    "truckId" INTEGER NOT NULL,

    CONSTRAINT "loadingPointToStockPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."stockPointToUnloadingPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "freightAmount" INTEGER NOT NULL,
    "transporterAmount" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stockPointId" INTEGER NOT NULL,
    "unloadingPointId" INTEGER NOT NULL,
    "truckId" INTEGER NOT NULL,

    CONSTRAINT "stockPointToUnloadingPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."loadingPointToUnloadingPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "filledLoad" INTEGER NOT NULL,
    "freightAmount" INTEGER NOT NULL,
    "transporterAmount" INTEGER NOT NULL,
    "totalFreightAmount" INTEGER NOT NULL,
    "totalTransporterAmount" INTEGER NOT NULL,
    "transporterBalance" INTEGER NOT NULL DEFAULT 0,
    "margin" INTEGER NOT NULL,
    "loadingPointId" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "unloadingPointId" INTEGER NOT NULL,
    "truckId" INTEGER NOT NULL,

    CONSTRAINT "loadingPointToUnloadingPointTrip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."loadingPoint" ADD CONSTRAINT "loadingPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."unloadingPoint" ADD CONSTRAINT "unloadingPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_stockPointToUnloadingPointTripId_fkey" FOREIGN KEY ("stockPointToUnloadingPointTripId") REFERENCES "subContract"."stockPointToUnloadingPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_loadingPointToStockPointTripId_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."singleTrip" ADD CONSTRAINT "singleTrip_loadingPointToUnloadingPointTripId_fkey" FOREIGN KEY ("loadingPointToUnloadingPointTripId") REFERENCES "subContract"."loadingPointToUnloadingPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_loadingPointToStockPointTripId_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_stockPointToUnloadingPointTripId_fkey" FOREIGN KEY ("stockPointToUnloadingPointTripId") REFERENCES "subContract"."stockPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_loadingPointToUnloadingPointTripId_fkey" FOREIGN KEY ("loadingPointToUnloadingPointTripId") REFERENCES "subContract"."loadingPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
