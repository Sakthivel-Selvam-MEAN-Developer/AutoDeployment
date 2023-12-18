-- AlterTable
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD COLUMN     "tripStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wantFuel" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "subContract"."paymentDues" (
    "id" SERIAL NOT NULL,
    "transporterName" TEXT NOT NULL,
    "tripId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "paidAmount" INTEGER NOT NULL,
    "paidAt" INTEGER NOT NULL,
    "remainingBalance" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "paymentDues_pkey" PRIMARY KEY ("id")
);
