const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ajouter un rendez-vous
exports.createRendezVous = async (req, res) => {
  const { patientId, nomMedecin, specialiteMedecin, motif, diagnostic, traitement, dateConsultation } = req.body;

  try {
    // Trouver le médecin
    const doctor = await prisma.user.findFirst({
      where: {
        nom: nomMedecin,
        specialite: specialiteMedecin
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: "Médecin introuvable" });
    }

    console.log("Date reçue:", dateConsultation);

    // Vérifier si un rendez-vous existe déjà à cette date
    const existingAppointment = await prisma.consultation.findFirst({
      where: {
        userId: doctor.id,
        dateConsultation: new Date(dateConsultation)
      }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: "Un rendez-vous existe déjà à cette date avec ce médecin." });
    }

    // Créer la consultation
    const consultation = await prisma.consultation.create({
      data: {
        patientId,
        userId: doctor.id,
        motif,
        diagnostic,
        traitement,
        dateConsultation: new Date(dateConsultation)
      }
    });

    res.status(201).json({ message: "Rendez-vous créé avec succès", consultation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Modifier un rendez-vous
exports.updateRendezVous = async (req, res) => {
  const { id } = req.params;
  const { motif, diagnostic, traitement, dateConsultation } = req.body;

  try {
    const updatedRendezVous = await prisma.consultation.update({
      where: { id: parseInt(id) },
      data: {
        motif,
        diagnostic,
        traitement,
        dateConsultation: new Date(dateConsultation)
      }
    });

    res.status(200).json({ message: "Rendez-vous mis à jour", rendezvous: updatedRendezVous });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


// Supprimer un rendez-vous
exports.deleteRendezVous = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.consultation.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: "Rendez-vous supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezvous = await prisma.consultation.findMany({
      include: {
        patient: true,
        doctor: true
      }
    });
    res.status(200).json(rendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
exports.getRendezVousById = async (req, res) => {
  const { id } = req.params;
  try {
    const rendezvous = await prisma.consultation.findUnique({
      where: { id: parseInt(id) },
      include: {
        patient: true,
        doctor: true
      }
    });

    if (!rendezvous) {
      return res.status(404).json({ message: "Rendez-vous non trouvé" });
    }

    res.status(200).json(rendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
// Lister tous les rendez-vous pour un médecin donné
exports.getRendezVousByMedecin = async (req, res) => {
  const { medecinId } = req.params; // ID du médecin passé dans l'URL

  try {
    const rendezvous = await prisma.consultation.findMany({
      where: {
        userId: parseInt(medecinId), // userId = id du médecin
      },
      include: {
        patient: true,    // Inclure les infos du patient
      },
      orderBy: {
        dateConsultation: 'asc', // Optionnel : trier par date
      },
    });

    res.status(200).json(rendezvous);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


