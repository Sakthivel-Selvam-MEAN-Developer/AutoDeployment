/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `bankDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `cementCompany` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `transporter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vehicleNumber]` on the table `truck` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `cementCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonName` to the `cementCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonNumber` to the `cementCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `cementCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gstNo` to the `cementCompany` table without a default value. This is not possible if the table is not empty.
  - Made the column `truckId` on table `factoryToCustomerTrip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `truckId` on table `factoryToStockPointTrip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deliveryPointId` on table `stockToCustomerPointTrip` required. This step will fail if there are existing NULL values in that column.
  - Made the column `truckId` on table `stockToCustomerPointTrip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" DROP CONSTRAINT "factoryToCustomerTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" DROP CONSTRAINT "factoryToStockPointTrip_truckId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP CONSTRAINT "stockToCustomerPointTrip_deliveryPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP CONSTRAINT "stockToCustomerPointTrip_truckId_fkey";

-- AlterTable
ALTER TABLE "subContract"."cementCompany" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "contactPersonName" TEXT NOT NULL,
ADD COLUMN     "contactPersonNumber" INTEGER NOT NULL,
ADD COLUMN     "emailId" TEXT NOT NULL,
ADD COLUMN     "gstNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."factoryToCustomerTrip" ALTER COLUMN "truckId" SET NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."factoryToStockPointTrip" ALTER COLUMN "truckId" SET NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."stockToCustomerPointTrip" ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "deliveryPointId" SET NOT NULL,
ALTER COLUMN "truckId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bankDetails_accountNumber_key" ON "subContract"."bankDetails"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "cementCompany_name_key" ON "subContract"."cementCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_name_key" ON "subContract"."transporter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "truck_vehicleNumber_key" ON "subContract"."truck"("vehicleNumber");

-- AddForeignKey
ALTER TABLE "subContract"."factoryToStockPointTrip" ADD CONSTRAINT "factoryToStockPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" ADD CONSTRAINT "stockToCustomerPointTrip_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "subContract"."deliveryPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockToCustomerPointTrip" ADD CONSTRAINT "stockToCustomerPointTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."factoryToCustomerTrip" ADD CONSTRAINT "factoryToCustomerTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
