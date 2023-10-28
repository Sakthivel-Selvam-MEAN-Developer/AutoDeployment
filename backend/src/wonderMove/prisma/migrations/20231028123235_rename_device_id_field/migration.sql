/*
  Warnings:

  - You are about to drop the column `locanavDeviceId` on the `loconavDevice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[loconavDeviceId]` on the table `loconavDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loconavDeviceId` to the `loconavDevice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "loconavDevice_locanavDeviceId_key";

-- AlterTable
ALTER TABLE "loconavDevice" DROP COLUMN "locanavDeviceId",
ADD COLUMN     "loconavDeviceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_loconavDeviceId_key" ON "loconavDevice"("loconavDeviceId");
