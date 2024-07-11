-- AlterTable
ALTER TABLE "subContract"."transporter" ADD COLUMN     "employeeId" INTEGER;

-- CreateTable
CREATE TABLE "subContract"."employee" (
    "id" SERIAL NOT NULL,
    "corporateId" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "mailId" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "department" INTEGER NOT NULL,
    "designation" INTEGER NOT NULL,
    "address" INTEGER NOT NULL,
    "dateOfBirth" INTEGER NOT NULL,
    "aadharNumber" INTEGER NOT NULL,
    "panNumber" INTEGER NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "loginAccess" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_corporateId_key" ON "subContract"."employee"("corporateId");

-- AddForeignKey
ALTER TABLE "subContract"."transporter" ADD CONSTRAINT "transporter_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "subContract"."employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
