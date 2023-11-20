/*
  Warnings:

  - You are about to drop the column `employeesId` on the `leaves` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `leaves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "peopleOrg"."leaves" DROP CONSTRAINT "leaves_employeesId_fkey";

-- AlterTable
ALTER TABLE "peopleOrg"."leaves" DROP COLUMN "employeesId",
ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "peopleOrg"."leaves" ADD CONSTRAINT "leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "peopleOrg"."employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;
