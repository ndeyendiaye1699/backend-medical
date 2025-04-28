const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ajouter une consultation
exports.createConsultation = async (req, res) => {
  const { patientId, motif, diagnostic, traitement, dateConsultation } = req.body;

  try {
    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        motif,
        diagnostic,
        traitement,
        dateConsultation: dateConsultation ? new Date(dateConsultation) : undefined,
      },
    });

    res.status(201).json({ message: "Consultation ajoutée avec succès", consultation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la consultation" });
  }
};

// Modifier une consultation
exports.updateConsultation = async (req, res) => {
  const { id } = req.params;
  const { motif, diagnostic, traitement, dateConsultation } = req.body;

  try {
    const updatedConsultation = await prisma.consultation.update({
      where: { id: parseInt(id) },
      data: {
        motif,
        diagnostic,
        traitement,
        dateConsultation: dateConsultation ? new Date(dateConsultation) : undefined,
      },
    });

    res.status(200).json({ message: "Consultation mise à jour", consultation: updatedConsultation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la consultation" });
  }
};

// Supprimer une consultation
exports.deleteConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.consultation.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Consultation supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la consultation" });
  }
};
// Récupérer toutes les consultations
exports.getAllConsultations = async (req, res) => {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { dateConsultation: 'desc' } // facultatif pour trier
    });
    res.status(200).json(consultations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des consultations" });
  }
};

