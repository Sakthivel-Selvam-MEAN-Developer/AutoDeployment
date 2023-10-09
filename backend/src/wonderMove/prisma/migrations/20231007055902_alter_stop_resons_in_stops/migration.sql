/*
  Warnings:

  - You are about to drop the column `stopReasonsId` on the `stops` table. All the data in the column will be lost.
  - Added the required column `stopReasonId` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stops" DROP CONSTRAINT "stops_stopReasonsId_fkey";

-- AlterTable
ALTER TABLE "stops" DROP COLUMN "stopReasonsId",
ADD COLUMN     "stopReasonId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "stops" ADD CONSTRAINT "stops_stopReasonId_fkey" FOREIGN KEY ("stopReasonId") REFERENCES "stopReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
