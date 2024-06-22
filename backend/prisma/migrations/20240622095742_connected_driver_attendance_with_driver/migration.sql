-- AddForeignKey
ALTER TABLE "driverSalary"."driverAttendance" ADD CONSTRAINT "driverAttendance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driverSalary"."driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
