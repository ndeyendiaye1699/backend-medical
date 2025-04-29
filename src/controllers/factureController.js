const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.createFacture = async (req, res) => {
    const { consultationId, montant } = req.body;
  
    try {
      // Vérifie que la consultation existe et récupère aussi le patient
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
          patient: true, // Inclure le patient lié à la consultation
        },
      });
  
      if (!consultation) {
        return res.status(404).json({ message: "Consultation non trouvée" });
      }
  
      // Création de la facture
      const facture = await prisma.facture.create({
        data: {
          consultationId,
          montant,
          statut: "non payée",
        },
      });
  
      // Retourner aussi le nom du patient avec la facture
      res.status(201).json({
        message: "Facture créée",
        facture,
        patientNom: consultation.patient.nom,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };
  