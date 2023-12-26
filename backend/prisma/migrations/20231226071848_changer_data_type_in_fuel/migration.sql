/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `loadingPoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `unloadingPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subContract"."fuel" ALTER COLUMN "pricePerliter" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "totalprice" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "loadingPoint_name_key" ON "subContract"."loadingPoint"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unloadingPoint_name_key" ON "subContract"."unloadingPoint"("name");
