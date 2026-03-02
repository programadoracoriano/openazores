-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('READ', 'WRITE', 'DELETE', 'ADMIN');

-- CreateTable
CREATE TABLE "UserPermissions" (
    "id" SERIAL NOT NULL,
    "permission" "Permission"[],

    CONSTRAINT "UserPermissions_pkey" PRIMARY KEY ("id")
);
