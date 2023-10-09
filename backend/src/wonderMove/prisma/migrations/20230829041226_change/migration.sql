/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vehicles_number_key" ON "vehicles"("number");
