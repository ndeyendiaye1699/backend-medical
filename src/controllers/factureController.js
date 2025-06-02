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
  // Récupérer toutes les factures
exports.getAllFactures = async (req, res) => {
    try {
      const factures = await prisma.facture.findMany({
        include: {
          consultation: {
            include: {
              patient: {
                select: {
                  id: true,
                  nom: true,
                  prenom: true,
                },
              },
            },
          },
        },
        orderBy: {
          dateEmission: 'desc'
        }
      });
  
      res.status(200).json(factures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };
  
  // Récupérer une facture par son ID
  exports.getFactureById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const facture = await prisma.facture.findUnique({
        where: { id: parseInt(id) },
        include: {
          consultation: {
            include: {
              patient: {
                select: {
                  id: true,
                  nom: true,
                  prenom: true,
                },
              },
            },
          },
        },
      });
  
      if (!facture) {
        return res.status(404).json({ message: "Facture non trouvée" });
      }
  
      res.status(200).json(facture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };
  
  // Mettre à jour une facture
  exports.updateFacture = async (req, res) => {
    const { id } = req.params;
    const { montant, statut } = req.body;
  
    try {
      const facture = await prisma.facture.update({
        where: { id: parseInt(id) },
        data: {
          montant: montant,
          statut: statut,
        },
      });
  
      res.status(200).json({ message: "Facture mise à jour", facture });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };
  
  // Supprimer une facture
  exports.deleteFacture = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.facture.delete({
        where: { id: parseInt(id) },
      });
  
      res.status(200).json({ message: "Facture supprimée" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };