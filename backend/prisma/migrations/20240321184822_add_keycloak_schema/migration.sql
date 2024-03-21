-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "accounting";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "keycloak";

-- CreateEnum
CREATE TYPE "accounting"."entityTypeEnum" AS ENUM ('CUSTOMER', 'VENDOR', 'TRANSPORTER', 'EMPLOYEE', 'SELF');

-- CreateEnum
CREATE TYPE "accounting"."accountKindEnum" AS ENUM ('RECEIVABLE', 'PAYABLE', 'BANK', 'CASH', 'GST_RECEIVABLE', 'GST_PAYABLE');

-- CreateEnum
CREATE TYPE "accounting"."entryType" AS ENUM ('DEBIT', 'CREDIT');

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

-- CreateIndex
CREATE UNIQUE INDEX "account_transactingEntityId_kind_key" ON "accounting"."account"("transactingEntityId", "kind");

-- AddForeignKey
ALTER TABLE "accounting"."account" ADD CONSTRAINT "account_transactingEntityId_fkey" FOREIGN KEY ("transactingEntityId") REFERENCES "accounting"."transactingEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting"."entry" ADD CONSTRAINT "entry_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounting"."account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounting"."entry" ADD CONSTRAINT "entry_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "accounting"."transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
