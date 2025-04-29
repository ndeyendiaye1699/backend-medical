const express = require('express');
const router = express.Router();
const { createFacture } = require('../controllers/factureController');

router.post('/', createFacture);

module.exports = router;
