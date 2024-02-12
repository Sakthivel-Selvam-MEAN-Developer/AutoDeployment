-- AlterTable
ALTER TABLE "subContract"."shortageQuantity" ALTER COLUMN "overallTripId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subContract"."shortageQuantity" ADD CONSTRAINT "shortageQuantity_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
