-- AlterTable
ALTER TABLE "subContract"."cementCompany" ALTER COLUMN "contactPersonNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "subContract"."deliveryPoint" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."factory" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "subContract"."stockPoint" ALTER COLUMN "location" DROP NOT NULL;
