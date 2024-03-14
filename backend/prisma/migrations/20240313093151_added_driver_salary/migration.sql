-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "driverSalary";

-- CreateTable
CREATE TABLE "driverSalary"."driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "dateofBirth" INTEGER NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "driverLicense" TEXT NOT NULL,
    "licenseExpriryDate" INTEGER NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountBranch" TEXT NOT NULL,
    "ifcsCode" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_aadharNumber_key" ON "driverSalary"."driver"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "driver_panNumber_key" ON "driverSalary"."driver"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "driver_mobileNumber_key" ON "driverSalary"."driver"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "driver_driverLicense_key" ON "driverSalary"."driver"("driverLicense");

-- CreateIndex
CREATE UNIQUE INDEX "driver_accountNumber_key" ON "driverSalary"."driver"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "driver_ifcsCode_key" ON "driverSalary"."driver"("ifcsCode");
