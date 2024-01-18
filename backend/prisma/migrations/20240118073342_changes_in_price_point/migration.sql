-- DropForeignKey
ALTER TABLE "subContract"."pricePoint" DROP CONSTRAINT "pricePoint_loadingPointId_fkey";

-- DropForeignKey
ALTER TABLE "subContract"."pricePoint" DROP CONSTRAINT "pricePoint_unloadingPointId_fkey";

-- AlterTable
ALTER TABLE "subContract"."pricePoint" ALTER COLUMN "loadingPointId" DROP NOT NULL,
ALTER COLUMN "unloadingPointId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;
