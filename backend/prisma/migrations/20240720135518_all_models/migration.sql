-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounting";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "driverSalary";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "identity";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "keycloak";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "peopleOrg";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "subContract";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "wonderMove";

-- CreateExtension
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "driverSalary"."expensesType" AS ENUM ('LOADING_CHARGES', 'UNLOADING_CHARGES', 'TOLL_EXPENSES', 'TRIP_ALLOWANCE', 'CASE_SLIP_EXPENSES', 'ROUTE_ALLOWANCES', 'OFFICE_EXPENSES', 'GREASING_CHARGES', 'AIR_CHECKUP_CHARGES', 'TOOLS_SPARES_CHARGES', 'WORKSHOP_SHOWROOM_CHARGES', 'PHONE_ATM_CHARGES', 'EMAIL_CHRGES', 'PUNCTURE_CHARGES', 'PARKING_CHARGES', 'WEIGHT_BRIDGE_CHARGES', 'OIL_CHARGES', 'ADBLUE_OIL_CHARGES', 'MECHANICAL_EXPENSES', 'SAFETY_EXEPENSES', 'ELECTRICAL_EXPENSES', 'MISCELLANCEOUS_EXPENSES');

-- CreateEnum
CREATE TYPE "accounting"."entityTypeEnum" AS ENUM ('CUSTOMER', 'VENDOR', 'TRANSPORTER', 'EMPLOYEE', 'SELF');

-- CreateEnum
CREATE TYPE "accounting"."accountKindEnum" AS ENUM ('RECEIVABLE', 'PAYABLE', 'BANK', 'CASH', 'GST_RECEIVABLE', 'GST_PAYABLE');

-- CreateEnum
CREATE TYPE "accounting"."entryType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateTable
CREATE TABLE "wonderMove"."customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "pan" TEXT,
    "gst" TEXT,
    "iGst" TEXT,
    "sGst" TEXT,
    "cGst" TEXT,
    "isGstBilling" BOOLEAN,
    "ourVendorCode" TEXT,
    "isTDSApplicable" BOOLEAN,
    "tdsPercentage" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "contactPersonId" INTEGER,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "AddressLine3" TEXT,
    "pincode" BIGINT,
    "state" TEXT,
    "city" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."people" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "mobile" BIGINT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."vehicles" (
    "id" SERIAL NOT NULL,
    "number" TEXT,
    "make" TEXT,
    "type" TEXT,
    "ownershipType" TEXT,
    "ownerName" TEXT,
    "insuranceExpiryDate" TIMESTAMPTZ(6),
    "taxExpiryDate" TIMESTAMPTZ(6),
    "npPermitDate" TIMESTAMPTZ(6),
    "fiveYearPermitDate" TIMESTAMPTZ(6),
    "fcDate" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."traccarDevice" (
    "id" SERIAL NOT NULL,
    "traccarId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "traccarDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."loconavDevice" (
    "id" SERIAL NOT NULL,
    "loconavDeviceId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "loconavToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "loconavDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."ktTelematicsDevice" (
    "id" SERIAL NOT NULL,
    "ktTelematicsDeviceId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "ktTelematicsToken" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "ktTelematicsDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."stopReasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stopReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."stops" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "durationInMillis" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "stopReasonId" INTEGER NOT NULL,
    "gpsStopId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."gpsStops" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "durationInMillis" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "gpsStops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wonderMove"."vehicleMovements" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "eventTime" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "vehicleMovements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."leaveReasons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "leaveReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."leaves" (
    "id" SERIAL NOT NULL,
    "appliedOn" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "isFromHalfDay" BOOLEAN NOT NULL,
    "isToHalfDay" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "approval" BOOLEAN,
    "comments" TEXT NOT NULL,
    "deniedComment" TEXT,
    "leaveReasonId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "leaves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "orgUnits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."employees" (
    "id" SERIAL NOT NULL,
    "employeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "orgUnitId" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnitHeads" (
    "id" SERIAL NOT NULL,
    "orgUnitId" INTEGER,
    "employeeId" INTEGER,

    CONSTRAINT "orgUnitHeads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peopleOrg"."orgUnitRelations" (
    "id" SERIAL NOT NULL,
    "parentOrgId" INTEGER,
    "childOrgId" INTEGER,

    CONSTRAINT "orgUnitRelations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."transporter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "employeeId" INTEGER,
    "emailId" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "aadharNumber" TEXT,
    "panNumber" TEXT,
    "hasGst" BOOLEAN NOT NULL DEFAULT false,
    "gstNumber" TEXT,
    "gstPercentage" DOUBLE PRECISION,
    "hasTds" BOOLEAN NOT NULL DEFAULT false,
    "transporterType" TEXT NOT NULL,
    "tdsPercentage" DOUBLE PRECISION,
    "accountHolder" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "branchName" TEXT NOT NULL DEFAULT 'name',
    "ifsc" TEXT NOT NULL,
    "accountTypeNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."employee" (
    "id" SERIAL NOT NULL,
    "corporateId" TEXT NOT NULL,
    "name" TEXT,
    "joiningDate" INTEGER NOT NULL,
    "mailId" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" INTEGER NOT NULL,
    "aadharNumber" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "accountName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "loginAccess" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."companyInvoice" (
    "id" SERIAL NOT NULL,
    "billNo" TEXT NOT NULL,
    "pdfLink" TEXT NOT NULL,
    "billDate" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "GSTAmount" INTEGER NOT NULL,
    "TDSAmount" INTEGER NOT NULL,
    "dueDate" INTEGER,
    "receivedAmount" INTEGER,
    "submissionDate" INTEGER,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "companyAdvisoryId" INTEGER,

    CONSTRAINT "companyInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."accountType" (
    "id" SERIAL NOT NULL,
    "accountTypeName" TEXT NOT NULL,
    "accountTypeNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "accountType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."cementCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gstNo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonNumber" TEXT NOT NULL,
    "quantityType" TEXT,
    "paymentOffSetDays" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "primaryBillId" INTEGER,
    "secondaryBillId" INTEGER,

    CONSTRAINT "cementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."companyAdvisory" (
    "id" SERIAL NOT NULL,
    "bankReferenceNumber" TEXT NOT NULL,
    "paymentDocumentNumber" TEXT NOT NULL,
    "paymentReceivedDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "companyAdvisory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."companyBillingDetails" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "panNumber" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "companyBillingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."loadingPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "pricePointMarkerId" INTEGER NOT NULL,

    CONSTRAINT "loadingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."stockPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "pricePointMarkerId" INTEGER NOT NULL,

    CONSTRAINT "stockPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."unloadingPoint" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "pricePointMarkerId" INTEGER NOT NULL,

    CONSTRAINT "unloadingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."pricePointMarker" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pricePointMarker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."loadingPointToStockPointTrip" (
    "id" SERIAL NOT NULL,
    "acknowledgeDueTime" INTEGER,
    "startDate" INTEGER NOT NULL,
    "partyName" TEXT NOT NULL DEFAULT '',
    "lrNumber" TEXT NOT NULL DEFAULT '',
    "filledLoad" DOUBLE PRECISION NOT NULL,
    "wantFuel" BOOLEAN,
    "tripStatus" BOOLEAN NOT NULL DEFAULT false,
    "freightAmount" DOUBLE PRECISION NOT NULL,
    "approvedFreightAmount" DOUBLE PRECISION,
    "billingRate" DOUBLE PRECISION,
    "transporterAmount" DOUBLE PRECISION NOT NULL,
    "totalFreightAmount" DOUBLE PRECISION NOT NULL,
    "totalTransporterAmount" DOUBLE PRECISION NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "loadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unloadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loadingPointId" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "stockPointId" INTEGER NOT NULL,
    "billNo" TEXT,
    "companyInvoiceId" INTEGER,

    CONSTRAINT "loadingPointToStockPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."stockPointToUnloadingPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "partyName" TEXT NOT NULL DEFAULT '',
    "lrNumber" TEXT NOT NULL DEFAULT '',
    "invoiceNumber" TEXT NOT NULL,
    "tripStatus" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgeDueTime" INTEGER,
    "freightAmount" DOUBLE PRECISION NOT NULL,
    "billingRate" DOUBLE PRECISION,
    "transporterAmount" DOUBLE PRECISION NOT NULL,
    "totalFreightAmount" DOUBLE PRECISION NOT NULL,
    "totalTransporterAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "unloadingPointId" INTEGER NOT NULL,
    "loadingPointToStockPointTripId" INTEGER NOT NULL,
    "billNo" TEXT,
    "companyInvoiceId" INTEGER,

    CONSTRAINT "stockPointToUnloadingPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."loadingPointToUnloadingPointTrip" (
    "id" SERIAL NOT NULL,
    "startDate" INTEGER NOT NULL,
    "filledLoad" DOUBLE PRECISION NOT NULL,
    "wantFuel" BOOLEAN,
    "tripStatus" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgeDueTime" INTEGER,
    "partyName" TEXT NOT NULL DEFAULT '',
    "lrNumber" TEXT NOT NULL DEFAULT '',
    "freightAmount" DOUBLE PRECISION NOT NULL,
    "approvedFreightAmount" DOUBLE PRECISION,
    "billingRate" DOUBLE PRECISION,
    "transporterAmount" DOUBLE PRECISION NOT NULL,
    "totalFreightAmount" DOUBLE PRECISION NOT NULL,
    "totalTransporterAmount" DOUBLE PRECISION NOT NULL,
    "margin" DOUBLE PRECISION NOT NULL,
    "loadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unloadingKilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "invoiceNumber" TEXT NOT NULL,
    "loadingPointId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "unloadingPointId" INTEGER NOT NULL,
    "billNo" TEXT,
    "companyInvoiceId" INTEGER,

    CONSTRAINT "loadingPointToUnloadingPointTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."bunk" (
    "id" SERIAL NOT NULL,
    "bunkName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "accountHolder" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "branchName" TEXT NOT NULL DEFAULT 'name',
    "accountTypeNumber" INTEGER NOT NULL,
    "emailId" TEXT,
    "contactPersonName" TEXT,
    "contactPersonNumber" TEXT,
    "bunkType" TEXT,
    "creaditDays" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "bunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."fuel" (
    "id" SERIAL NOT NULL,
    "fueledDate" INTEGER NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "pricePerliter" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "totalprice" DOUBLE PRECISION NOT NULL,
    "dieselkilometer" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fuelType" TEXT,
    "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
    "vehicleNumber" TEXT NOT NULL,
    "bunkId" INTEGER NOT NULL,
    "overallTripId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fuel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."truck" (
    "id" SERIAL NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "transporterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."pricePoint" (
    "id" SERIAL NOT NULL,
    "freightAmount" DOUBLE PRECISION NOT NULL,
    "transporterAmount" DOUBLE PRECISION NOT NULL,
    "transporterPercentage" DOUBLE PRECISION NOT NULL,
    "payGeneratingDuration" INTEGER NOT NULL DEFAULT 0,
    "transporterAdvancePercentage" INTEGER NOT NULL DEFAULT 70,
    "loadingPointId" INTEGER,
    "unloadingPointId" INTEGER,
    "stockPointId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "pricePoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."paymentDues" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "vehicleNumber" TEXT NOT NULL,
    "dueDate" INTEGER NOT NULL,
    "fuelId" INTEGER,
    "type" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "NEFTStatus" BOOLEAN NOT NULL DEFAULT false,
    "payableAmount" DOUBLE PRECISION NOT NULL,
    "transactionId" TEXT,
    "paidAt" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "overallTripId" INTEGER,

    CONSTRAINT "paymentDues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."shortageQuantity" (
    "id" SERIAL NOT NULL,
    "overallTripId" INTEGER,
    "shortageQuantity" INTEGER NOT NULL,
    "shortageAmount" INTEGER NOT NULL,
    "approvalStatus" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "filledLoad" INTEGER NOT NULL,
    "unloadedQuantity" INTEGER NOT NULL,
    "unloadedDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "shortageQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."tollPayment" (
    "id" SERIAL NOT NULL,
    "overallTripId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "billNo" TEXT,
    "billDate" INTEGER,
    "tollPlazaLocationId" INTEGER,
    "billedStatus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."tollPlazaLocation" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "tollPlazaLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."overallTrip" (
    "id" SERIAL NOT NULL,
    "tdsPercenatage" INTEGER,
    "tdsAmount" INTEGER,
    "acknowledgementStatus" BOOLEAN NOT NULL DEFAULT false,
    "acknowledgementPdfLink" TEXT,
    "acknowledgementApproval" BOOLEAN NOT NULL DEFAULT false,
    "pricePointApprovalStatus" BOOLEAN NOT NULL DEFAULT false,
    "finalPayDuration" INTEGER NOT NULL DEFAULT 0,
    "transporterInvoice" TEXT NOT NULL DEFAULT '',
    "transporterInvoiceReceivedDate" INTEGER,
    "acknowledgementDate" INTEGER,
    "loadingPointToStockPointTripId" INTEGER,
    "stockPointToUnloadingPointTripId" INTEGER,
    "loadingPointToUnloadingPointTripId" INTEGER,
    "truckId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "overallTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."billNo" (
    "id" INTEGER NOT NULL,
    "lastBillNo" TEXT NOT NULL,

    CONSTRAINT "billNo_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "driverSalary"."driverTrip" (
    "id" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "tripStartDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverId" INTEGER NOT NULL,
    "unloadingTripSalaryId" INTEGER,
    "stockTripSalaryId" INTEGER,
    "primaryTripBetta" INTEGER,
    "secondaryTripBetta" INTEGER,
    "dailyBetta" INTEGER,
    "driverAdvance" INTEGER[],

    CONSTRAINT "driverTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."driverAdvance" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "advanceDate" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverTripId" INTEGER NOT NULL,

    CONSTRAINT "driverAdvance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."driverAttendance" (
    "id" SERIAL NOT NULL,
    "attendance" JSONB[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "driverAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."expenses" (
    "id" SERIAL NOT NULL,
    "expenseType" "driverSalary"."expensesType" NOT NULL,
    "expenseDate" INTEGER,
    "placedAmount" INTEGER NOT NULL,
    "acceptedAmount" INTEGER,
    "rejectableReason" TEXT,
    "expenseApproval" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driverSalary"."tripSalary" (
    "id" SERIAL NOT NULL,
    "cementCompanyId" INTEGER NOT NULL,
    "loadingPointId" INTEGER,
    "stockPointId" INTEGER,
    "unloadingPointId" INTEGER,
    "tripBetta" INTEGER NOT NULL,
    "appPayAdvance" INTEGER NOT NULL,
    "dailyBetta" INTEGER NOT NULL,

    CONSTRAINT "tripSalary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting"."account" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kind" "accounting"."accountKindEnum" NOT NULL,
    "transactingEntityId" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting"."transactingEntity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "types" "accounting"."entityTypeEnum"[],
    "gst" TEXT,
    "pan" TEXT,
    "address" TEXT,
    "contact" TEXT,

    CONSTRAINT "transactingEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting"."transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounting"."entry" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "accounting"."entryType" NOT NULL,
    "accountId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subContract"."auditLogs" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" INTEGER NOT NULL,
    "actionBy" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "actionStartTime" TIMESTAMP(3) NOT NULL,
    "actionEndTime" TIMESTAMP(3) NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityID" INTEGER,

    CONSTRAINT "auditLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_name_key" ON "wonderMove"."customers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customers_contactPersonId_key" ON "wonderMove"."customers"("contactPersonId");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_number_key" ON "wonderMove"."vehicles"("number");

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_traccarId_key" ON "wonderMove"."traccarDevice"("traccarId");

-- CreateIndex
CREATE UNIQUE INDEX "traccarDevice_vehicleId_key" ON "wonderMove"."traccarDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_loconavDeviceId_key" ON "wonderMove"."loconavDevice"("loconavDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "loconavDevice_vehicleId_key" ON "wonderMove"."loconavDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_ktTelematicsDeviceId_key" ON "wonderMove"."ktTelematicsDevice"("ktTelematicsDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ktTelematicsDevice_vehicleId_key" ON "wonderMove"."ktTelematicsDevice"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "stopReasons_name_key" ON "wonderMove"."stopReasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gpsStops_vehicleId_startTime_key" ON "wonderMove"."gpsStops"("vehicleId", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "leaveReasons_name_key" ON "peopleOrg"."leaveReasons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "orgUnits_name_key" ON "peopleOrg"."orgUnits"("name");

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeId_key" ON "peopleOrg"."employees"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_name_key" ON "subContract"."transporter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_emailId_key" ON "subContract"."transporter"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_contactPersonNumber_key" ON "subContract"."transporter"("contactPersonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_aadharNumber_key" ON "subContract"."transporter"("aadharNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_panNumber_key" ON "subContract"."transporter"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "transporter_accountNumber_key" ON "subContract"."transporter"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "employee_corporateId_key" ON "subContract"."employee"("corporateId");

-- CreateIndex
CREATE UNIQUE INDEX "accountType_accountTypeName_key" ON "subContract"."accountType"("accountTypeName");

-- CreateIndex
CREATE UNIQUE INDEX "accountType_accountTypeNumber_key" ON "subContract"."accountType"("accountTypeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "cementCompany_name_key" ON "subContract"."cementCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cementCompany_emailId_key" ON "subContract"."cementCompany"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "loadingPointToStockPointTrip_invoiceNumber_key" ON "subContract"."loadingPointToStockPointTrip"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "stockPointToUnloadingPointTrip_invoiceNumber_key" ON "subContract"."stockPointToUnloadingPointTrip"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "loadingPointToUnloadingPointTrip_invoiceNumber_key" ON "subContract"."loadingPointToUnloadingPointTrip"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "bunk_accountNumber_key" ON "subContract"."bunk"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "bunk_emailId_key" ON "subContract"."bunk"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "bunk_contactPersonNumber_key" ON "subContract"."bunk"("contactPersonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "fuel_invoiceNumber_key" ON "subContract"."fuel"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "truck_vehicleNumber_key" ON "subContract"."truck"("vehicleNumber");

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
CREATE UNIQUE INDEX "account_transactingEntityId_kind_key" ON "accounting"."account"("transactingEntityId", "kind");

-- AddForeignKey
ALTER TABLE "wonderMove"."customers" ADD CONSTRAINT "customers_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "wonderMove"."people"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."traccarDevice" ADD CONSTRAINT "traccarDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."loconavDevice" ADD CONSTRAINT "loconavDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."ktTelematicsDevice" ADD CONSTRAINT "ktTelematicsDevice_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."stops" ADD CONSTRAINT "stops_stopReasonId_fkey" FOREIGN KEY ("stopReasonId") REFERENCES "wonderMove"."stopReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."stops" ADD CONSTRAINT "stops_gpsStopId_fkey" FOREIGN KEY ("gpsStopId") REFERENCES "wonderMove"."gpsStops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."gpsStops" ADD CONSTRAINT "gpsStops_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wonderMove"."vehicleMovements" ADD CONSTRAINT "vehicleMovements_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "wonderMove"."vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."leaves" ADD CONSTRAINT "leaves_leaveReasonId_fkey" FOREIGN KEY ("leaveReasonId") REFERENCES "peopleOrg"."leaveReasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."leaves" ADD CONSTRAINT "leaves_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "peopleOrg"."employees"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."employees" ADD CONSTRAINT "employees_orgUnitId_fkey" FOREIGN KEY ("orgUnitId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_orgUnitId_fkey" FOREIGN KEY ("orgUnitId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitHeads" ADD CONSTRAINT "orgUnitHeads_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "peopleOrg"."employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitRelations" ADD CONSTRAINT "orgUnitRelations_parentOrgId_fkey" FOREIGN KEY ("parentOrgId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peopleOrg"."orgUnitRelations" ADD CONSTRAINT "orgUnitRelations_childOrgId_fkey" FOREIGN KEY ("childOrgId") REFERENCES "peopleOrg"."orgUnits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."transporter" ADD CONSTRAINT "transporter_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "subContract"."employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."companyInvoice" ADD CONSTRAINT "companyInvoice_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."companyInvoice" ADD CONSTRAINT "companyInvoice_companyAdvisoryId_fkey" FOREIGN KEY ("companyAdvisoryId") REFERENCES "subContract"."companyAdvisory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."cementCompany" ADD CONSTRAINT "cementCompany_primaryBillId_fkey" FOREIGN KEY ("primaryBillId") REFERENCES "subContract"."companyBillingDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."cementCompany" ADD CONSTRAINT "cementCompany_secondaryBillId_fkey" FOREIGN KEY ("secondaryBillId") REFERENCES "subContract"."companyBillingDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPoint" ADD CONSTRAINT "loadingPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPoint" ADD CONSTRAINT "loadingPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPoint" ADD CONSTRAINT "stockPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPoint" ADD CONSTRAINT "stockPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."unloadingPoint" ADD CONSTRAINT "unloadingPoint_cementCompanyId_fkey" FOREIGN KEY ("cementCompanyId") REFERENCES "subContract"."cementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."unloadingPoint" ADD CONSTRAINT "unloadingPoint_pricePointMarkerId_fkey" FOREIGN KEY ("pricePointMarkerId") REFERENCES "subContract"."pricePointMarker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToStockPointTrip" ADD CONSTRAINT "loadingPointToStockPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_loadingPointToStockPointTri_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."stockPointToUnloadingPointTrip" ADD CONSTRAINT "stockPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."loadingPointToUnloadingPointTrip" ADD CONSTRAINT "loadingPointToUnloadingPointTrip_companyInvoiceId_fkey" FOREIGN KEY ("companyInvoiceId") REFERENCES "subContract"."companyInvoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_bunkId_fkey" FOREIGN KEY ("bunkId") REFERENCES "subContract"."bunk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."fuel" ADD CONSTRAINT "fuel_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."truck" ADD CONSTRAINT "truck_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "subContract"."transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_loadingPointId_fkey" FOREIGN KEY ("loadingPointId") REFERENCES "subContract"."loadingPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_unloadingPointId_fkey" FOREIGN KEY ("unloadingPointId") REFERENCES "subContract"."unloadingPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."pricePoint" ADD CONSTRAINT "pricePoint_stockPointId_fkey" FOREIGN KEY ("stockPointId") REFERENCES "subContract"."stockPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."paymentDues" ADD CONSTRAINT "paymentDues_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."shortageQuantity" ADD CONSTRAINT "shortageQuantity_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."tollPayment" ADD CONSTRAINT "tollPayment_overallTripId_fkey" FOREIGN KEY ("overallTripId") REFERENCES "subContract"."overallTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."tollPayment" ADD CONSTRAINT "tollPayment_tollPlazaLocationId_fkey" FOREIGN KEY ("tollPlazaLocationId") REFERENCES "subContract"."tollPlazaLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_loadingPointToStockPointTripId_fkey" FOREIGN KEY ("loadingPointToStockPointTripId") REFERENCES "subContract"."loadingPointToStockPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_stockPointToUnloadingPointTripId_fkey" FOREIGN KEY ("stockPointToUnloadingPointTripId") REFERENCES "subContract"."stockPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_loadingPointToUnloadingPointTripId_fkey" FOREIGN KEY ("loadingPointToUnloadingPointTripId") REFERENCES "subContract"."loadingPointToUnloadingPointTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subContract"."overallTrip" ADD CONSTRAINT "overallTrip_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "subContract"."truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driverSalary"."driverTrip" ADD CONSTRAINT "driverTrip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driverSalary"."driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driverSalary"."driverAdvance" ADD CONSTRAINT "driverAdvance_driverTripId_fkey" FOREIGN KEY ("driverTripId") REFERENCES "driverSalary"."driverTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driverSalary"."driverAttendance" ADD CONSTRAINT "driverAttendance_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "driverSalary"."driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting"."account" ADD CONSTRAINT "account_transactingEntityId_fkey" FOREIGN KEY ("transactingEntityId") REFERENCES "accounting"."transactingEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting"."entry" ADD CONSTRAINT "entry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounting"."account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting"."entry" ADD CONSTRAINT "entry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "accounting"."transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
