/*
  Warnings:

  - A unique constraint covering the columns `[userId,dateConsultation]` on the table `Consultation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialite` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "specialite" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Consultation_userId_dateConsultation_key" ON "Consultation"("userId", "dateConsultation");

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
