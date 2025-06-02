const express = require('express');
const router = express.Router();
const { 
    createFacture, 
    getAllFactures, 
    getFactureById, 
    updateFacture, 
    deleteFacture 
} = require('../controllers/factureController');
router.post('/', createFacture);
router.get('/', getAllFactures);
router.get('/:id', getFactureById);
router.put('/:id', updateFacture);
router.delete('/:id', deleteFacture);
module.exports = router;
