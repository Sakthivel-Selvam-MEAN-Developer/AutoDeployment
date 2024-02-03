/*
  Warnings:

  - You are about to drop the column `invoiceNumber` on the `paymentDues` table. All the data in the column will be lost.
  - You are about to drop the column `tripId` on the `paymentDues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."fuel" ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "subContract"."paymentDues" DROP COLUMN "invoiceNumber",
DROP COLUMN "tripId",
ADD COLUMN     "overallTripId" INTEGER;

-- AddForeignKey
ALTER TABLE "subContract"."paymentDues" ADD CONSTRAINT "paymentDues_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
