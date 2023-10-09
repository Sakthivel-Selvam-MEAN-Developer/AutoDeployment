/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "AddressLine3" TEXT,
ADD COLUMN     "addressLine1" TEXT,
ADD COLUMN     "addressLine2" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "pincode" BIGINT,
ADD COLUMN     "state" TEXT;

-- DropTable
DROP TABLE "addresses";

-- CreateIndex
CREATE UNIQUE INDEX "customers_name_key" ON "customers"("name");
