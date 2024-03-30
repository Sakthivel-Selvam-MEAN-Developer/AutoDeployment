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
