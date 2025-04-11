const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Ajouter un patient
exports.createPatient = async (req, res) => {
  const {
    nom,
    prenom,
    dateNaissance,
    adresse,
    telephone,
    email,
    sexe,
    groupeSanguin,
    antécédents
  } = req.body;

  try {
    const newPatient = await prisma.patient.create({
      data: {
        nom,
        prenom,
        dateNaissance: new Date(dateNaissance),
        adresse,
        telephone,
        email,
        sexe,
        groupeSanguin,
        antécédents,
      },
    });

    return res.status(201).json({ message: 'Patient ajouté avec succès', patient: newPatient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur lors de l\'ajout du patient' });
  }
};

// Liste de tous les patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
// Modifier un patient
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    prenom,
    dateNaissance,
    adresse,
    telephone,
    email,
    sexe,
    groupeSanguin,
    antécédents
  } = req.body;

  try {
    const updatedPatient = await prisma.patient.update({
      where: { id: parseInt(id) },
      data: {
        nom,
        prenom,
        dateNaissance: new Date(dateNaissance),
        adresse,
        telephone,
        email,
        sexe,
        groupeSanguin,
        antécédents,
      },
    });

    return res.status(200).json({ message: 'Patient mis à jour', patient: updatedPatient });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la mise à jour du patient" });
  }
};

// Supprimer un patient
exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.patient.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Patient supprimé avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors de la suppression du patient" });
  }
};
