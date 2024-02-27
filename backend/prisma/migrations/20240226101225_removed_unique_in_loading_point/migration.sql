/*
  Warnings:

  - You are about to drop the `userRoles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "subContract"."loadingPoint_name_key";

-- DropIndex
DROP INDEX "subContract"."stockPoint_name_key";

-- DropIndex
DROP INDEX "subContract"."unloadingPoint_name_key";

-- DropTable
DROP TABLE "identity"."userRoles";
