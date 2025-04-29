-- CreateTable
CREATE TABLE "Facture" (
    "id" SERIAL NOT NULL,
    "consultationId" INTEGER NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "dateEmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" TEXT NOT NULL DEFAULT 'non payée',

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Facture_consultationId_key" ON "Facture"("consultationId");

-- AddForeignKey
ALTER TABLE "Facture" ADD CONSTRAINT "Facture_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
