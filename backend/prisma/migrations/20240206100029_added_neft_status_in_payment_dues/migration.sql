-- AlterTable
ALTER TABLE "subContract"."paymentDues" ADD COLUMN     "NEFTStatus" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "gstPercentage" DOUBLE PRECISION,
ALTER COLUMN "tdsPercentage" SET DATA TYPE DOUBLE PRECISION;
