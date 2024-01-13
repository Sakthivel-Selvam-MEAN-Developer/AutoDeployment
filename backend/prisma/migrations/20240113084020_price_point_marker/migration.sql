/*
  Warnings:

  - You are about to drop the column `location` on the `loadingPoint` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `stockPoint` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `unloadingPoint` table. All the data in the column will be lost.
  - Added the required column `pricePointMarkerId` to the `loadingPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePointMarkerId` to the `stockPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePointMarkerId` to the `unloadingPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subContract"."loadingPoint" DROP COLUMN "location",
ADD COLUMN     "pricePointMarkerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."stockPoint" DROP COLUMN "location",
ADD COLUMN     "pricePointMarkerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."unloadingPoint" DROP COLUMN "location",
ADD COLUMN     "pricePointMarkerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "subContract"."pricePointMarker" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pricePointMarker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."loadingPoint" ADD CONSTRAINT "loadingPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPoint" ADD CONSTRAINT "stockPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."unloadingPoint" ADD CONSTRAINT "unloadingPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
