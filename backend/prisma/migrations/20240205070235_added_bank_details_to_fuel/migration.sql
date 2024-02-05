/*
  Warnings:

  - You are about to drop the column `fuelStationId` on the `fuel` table. All the data in the column will be lost.
  - You are about to drop the `fuelStation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountNumber]` on the table `bunk` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountHolder` to the `bunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `bunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountTypeNumber` to the `bunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifsc` to the `bunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `bunk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bunkId` to the `fuel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subContract"."fuel" DROP CONSTRAINT "fuel_fuelStationId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."fuelStation" DROP CONSTRAINT "fuelStation_bunkId_fkey";

-- AlterTable
ALTER TABLE "subContract"."bunk" ADD COLUMN     "accountHolder" TEXT NOT NULL,
ADD COLUMN     "accountNumber" TEXT NOT NULL,
ADD COLUMN     "accountTypeNumber" INTEGER NOT NULL,
ADD COLUMN     "ifsc" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."fuel" DROP COLUMN "fuelStationId",
ADD COLUMN     "bunkId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."paymentDues" ADD COLUMN     "fuelId" INTEGER;

-- DropTable
DROP TABLE "subContract"."fuelStation";

-- CreateIndex
CREATE UNIQUE INDEX "bunk_accountNumber_key" ON "subContract"."bunk"("accountNumber");

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_bunkId_fkey" FOREIGN KEY ("bunkId") REFERENCES "subContract"."bunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
