-- AlterTable
ALTER TABLE "subContract"."overallTrip" ADD COLUMN     "truckId" INTEGER;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

