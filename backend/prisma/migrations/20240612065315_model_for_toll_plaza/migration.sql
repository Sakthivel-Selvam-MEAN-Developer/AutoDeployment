-- CreateTable
CREATE TABLE "subContract"."tollPlaza" (
    "id" SERIAL NOT NULL,
    "overallTripId" INTEGER NOT NULL,
    "tollPlazaLocation" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "billNo" TEXT,
    "billDate" INTEGER,
    "billedStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPlaza_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subContract"."tollPlaza" ADD CONSTRAINT "tollPlaza_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
