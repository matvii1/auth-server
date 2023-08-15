/*
  Warnings:

  - You are about to drop the column `refreshToeken` on the `Token` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "refreshToeken",
ADD COLUMN     "refreshToken" TEXT NOT NULL;
