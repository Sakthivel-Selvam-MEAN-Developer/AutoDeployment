/*
  Warnings:

  - You are about to drop the column `date` on the `driverAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `driverPresence` on the `driverAttendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "driverSalary"."driverAttendance" DROP CONSTRAINT "driverAttendance_driverId_fkey";

-- AlterTable
ALTER TABLE "driverSalary"."driverAttendance" DROP COLUMN "date",
DROP COLUMN "driverPresence",
ADD COLUMN     "attendance" JSONB[];
