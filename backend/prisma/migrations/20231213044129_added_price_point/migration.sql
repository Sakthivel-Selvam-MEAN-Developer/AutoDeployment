/*
  Warnings:

  - You are about to drop the column `endDate` on the `factoryToCustomerTrip` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `factoryToStockPointTrip` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `stockToCustomerPointTrip` table. All the data in the column will be lost.
  - Added the required column `freightAmount` to the `factoryToCustomerTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `margin` to the `factoryToCustomerTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFreightAmount` to the `factoryToCustomerTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransporterAmount` to the `factoryToCustomerTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transporterAmount` to the `factoryToCustomerTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freightAmount` to the `factoryToStockPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transporterAmount` to the `factoryToStockPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `freightAmount` to the `stockToCustomerPointTrip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transporterAmount` to the `stockToCustomerPointTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."factoryToCustomerTrip" DROP COLUMN "endDate",
ADD COLUMN     "freightAmount" INTEGER NOT NULL,
ADD COLUMN     "margin" INTEGER NOT NULL,
ADD COLUMN     "totalFreightAmount" INTEGER NOT NULL,
ADD COLUMN     "totalTransporterAmount" INTEGER NOT NULL,
ADD COLUMN     "transporterAmount" INTEGER NOT NULL,
ADD COLUMN     "transporterBalance" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subContract"."factoryToStockPointTrip" DROP COLUMN "endDate",
ADD COLUMN     "freightAmount" INTEGER NOT NULL,
ADD COLUMN     "transporterAmount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."stockToCustomerPointTrip" DROP COLUMN "endDate",
ADD COLUMN     "freightAmount" INTEGER NOT NULL,
ADD COLUMN     "transporterAmount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "subContract"."pricePoint" (
    "id" SERIAL NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "deliveryPointId" INTEGER NOT NULL,
    "freightAmount" INTEGER NOT NULL,
    "transporterAmount" INTEGER NOT NULL,
    "transporterPercentage" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pricePoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "subContract"."factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_deliveryPointId_fkey" FOREIGN KEY ("deliveryPointId") REFERENCES "subContract"."deliveryPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
