/*
  Warnings:

  - You are about to drop the column `tollPlazaLocation` on the `tollPlaza` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subContract"."tollPlaza" DROP COLUMN "tollPlazaLocation",
ADD COLUMN     "tollPlazaLocationId" INTEGER;

-- CreateTable
CREATE TABLE "subContract"."tollPlazaLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPlazaLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."tollPlaza" ADD CONSTRAINT "tollPlaza_tollPlazaLocationId_fkey" FOREIGN KEY ("tollPlazaLocationId") REFERENCES "subContract"."tollPlazaLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
