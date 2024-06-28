-- AlterTable
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_pkey" TO "tollPayment_pkey";

-- RenameForeignKey
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_overallTripId_fkey" TO "tollPayment_overallTripId_fkey";

-- RenameForeignKey
ALTER TABLE "subContract"."tollPayment" RENAME CONSTRAINT "tollPlaza_tollPlazaLocationId_fkey" TO "tollPayment_tollPlazaLocationId_fkey";
