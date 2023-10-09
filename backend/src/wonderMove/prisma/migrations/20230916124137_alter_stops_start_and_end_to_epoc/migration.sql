/*
  Warnings:

  - You are about to drop the column `duration` on the `stops` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `stopReasons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationInMillis` to the `stops` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `stops` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `stops` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "stops" DROP COLUMN "duration",
ADD COLUMN     "durationInMillis" INTEGER NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" INTEGER NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stopReasons_name_key" ON "stopReasons"("name");
