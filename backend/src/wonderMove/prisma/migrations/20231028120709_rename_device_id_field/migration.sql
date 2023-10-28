/*
  Warnings:

  - You are about to drop the column `traccarId` on the `loconavDevice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locanavDeviceId]` on the table `loconavDevice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locanavDeviceId` to the `loconavDevice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "loconavDevice_traccarId_key";

-- AlterTable
ALTER TABLE "loconavDevice" DROP COLUMN "traccarId",
ADD COLUMN     "locanavDeviceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_locanavDeviceId_key" ON "loconavDevice"("locanavDeviceId");
