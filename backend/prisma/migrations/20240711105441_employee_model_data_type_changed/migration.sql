/*
  Warnings:

  - Changed the type of `joiningDate` on the `employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "subContract"."employee" DROP COLUMN "joiningDate",
ADD COLUMN     "joiningDate" INTEGER NOT NULL,
ALTER COLUMN "department" SET DATA TYPE TEXT,
ALTER COLUMN "designation" SET DATA TYPE TEXT,
ALTER COLUMN "address" SET DATA TYPE TEXT,
ALTER COLUMN "aadharNumber" SET DATA TYPE TEXT,
ALTER COLUMN "panNumber" SET DATA TYPE TEXT,
ALTER COLUMN "accountNumber" SET DATA TYPE TEXT;
