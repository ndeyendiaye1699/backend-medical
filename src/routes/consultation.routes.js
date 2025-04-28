// routes/consultation.routes.js

const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');

// Ajouter une consultation
router.post('/', consultationController.createConsultation); // POST pour ajouter une consultation

// Modifier une consultation
router.put('/:id', consultationController.updateConsultation); // PUT pour mettre à jour une consultation

// Supprimer une consultation
router.delete('/:id', consultationController.deleteConsultation); // DELETE pour supprimer une consultation
// Récupérer toutes les consultations
router.get('/', consultationController.getAllConsultations);

module.exports = router;
