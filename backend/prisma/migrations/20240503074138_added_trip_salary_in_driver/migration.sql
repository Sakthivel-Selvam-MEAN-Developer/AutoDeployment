-- CreateTable
CREATE TABLE "driverSalary"."tripSalary" (
    "id" SERIAL NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "loadingPointId" INTEGER,
    "stockPointId" INTEGER,
    "unloadingPointId" INTEGER,
    "tripBetta" INTEGER NOT NULL,
    "driverAdvance" INTEGER NOT NULL,
    "dailyBetta" INTEGER NOT NULL,

    CONSTRAINT "tripSalary_pkey" PRIMARY KEY ("id")
);
