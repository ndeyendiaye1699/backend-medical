const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Middleware d'authentification à ajouter plus tard
// const { protect } = require('../middlewares/auth.middleware');

// router.use(protect);

// Ajouter un patient
router.post('/', patientController.createPatient);

// Récupérer tous les patients
router.get('/', patientController.getAllPatients);

// Modifier un patient
router.put('/:id', patientController.updatePatient);

// Supprimer un patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
