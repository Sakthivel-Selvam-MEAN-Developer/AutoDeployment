/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNumber]` on the table `loadingPointToStockPointTrip` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[invoiceNumber]` on the table `loadingPointToUnloadingPointTrip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleNumber` to the `paymentDues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."paymentDues" ADD COLUMN     "vehicleNumber" TEXT NOT NULL,
ALTER COLUMN "tripId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "loadingPointToStockPointTrip_invoiceNumber_key" ON "subContract"."loadingPointToStockPointTrip"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "loadingPointToUnloadingPointTrip_invoiceNumber_key" ON "subContract"."loadingPointToUnloadingPointTrip"("invoiceNumber");
