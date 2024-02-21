/*
  Warnings:

  - You are about to drop the column `employeesId` on the `orgUnitHeads` table. All the data in the column will be lost.
  - You are about to drop the column `orgUnitsId` on the `orgUnitHeads` table. All the data in the column will be lost.

*/
-- CreateExtension
-- CREATE EXTENSION IF NOT EXISTS "timescaledb";

-- DropForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" DROP CONSTRAINT "orgUnitHeads_employeesId_fkey";

-- DropForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" DROP CONSTRAINT "orgUnitHeads_orgUnitsId_fkey";

-- AlterTable
ALTER TABLE "peopleOrg"."orgUnitHeads" DROP COLUMN "employeesId",
DROP COLUMN "orgUnitsId",
ADD COLUMN     "employeeId" INTEGER,
ADD COLUMN     "orgUnitId" INTEGER;

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnitRelations" (
    "id" SERIAL NOT NULL,
    "parentOrgId" INTEGER,
    "childOrgId" INTEGER,

    CONSTRAINT "orgUnitRelations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_orgUnitId_fkey" FOREIGN KEY ("orgUnitId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "peopleOrg"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitRelations" ADD CONSTRAINT "orgUnitRelations_parentOrgId_fkey" FOREIGN KEY ("parentOrgId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitRelations" ADD CONSTRAINT "orgUnitRelations_childOrgId_fkey" FOREIGN KEY ("childOrgId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
