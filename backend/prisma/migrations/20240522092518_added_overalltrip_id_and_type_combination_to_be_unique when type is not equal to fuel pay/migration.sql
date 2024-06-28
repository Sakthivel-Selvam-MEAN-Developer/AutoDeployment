/*
  Warnings:

  - A unique constraint covering the columns `[overallTripId,type]` on the table `paymentDues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
-- CREATE UNIQUE INDEX "paymentDues_overallTripId_type_key" ON "subContract"."paymentDues"("overallTripId", "type");
CREATE UNIQUE INDEX "paymentDues_overallTripId_type_key"
ON "subContract"."paymentDues"("overallTripId", "type")
WHERE "type" != 'fuel pay';
