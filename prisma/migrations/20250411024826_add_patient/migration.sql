/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adresse` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupeSanguin` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "adresse" TEXT NOT NULL,
ADD COLUMN     "antécédents" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "groupeSanguin" TEXT NOT NULL,
ADD COLUMN     "sexe" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
