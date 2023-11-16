-- AlterTable
ALTER TABLE "leaves" ADD COLUMN     "employeesId" TEXT;

-- AddForeignKey
ALTER TABLE "leaves" ADD CONSTRAINT "leaves_employeesId_fkey" FOREIGN KEY ("employeesId") REFERENCES "employees"("employeeId") ON DELETE SET NULL ON UPDATE CASCADE;
