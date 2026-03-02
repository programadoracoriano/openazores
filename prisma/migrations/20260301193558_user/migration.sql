/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPermissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `UserPermissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPermissions" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissions_userId_key" ON "UserPermissions"("userId");

-- AddForeignKey
ALTER TABLE "UserPermissions" ADD CONSTRAINT "UserPermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
