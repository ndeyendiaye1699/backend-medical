const express = require('express');
const router = express.Router();
const rendezvousController = require('../controllers/rendezvousController'); // Vérifiez ce chemin

// Ajouter un rendez-vous
router.post('/', rendezvousController.createRendezVous);

router.get('/', rendezvousController.getAllRendezVous);
router.get('/:id', rendezvousController.getRendezVousById);
router.put('/:id', rendezvousController.updateRendezVous);
router.delete('/:id', rendezvousController.deleteRendezVous);
router.get('/medecin/:medecinId', rendezvousController.getRendezVousByMedecin);
module.exports = router;
