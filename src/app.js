// src/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importation des routes
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/auth.routes');
const consultationRoutes = require('./routes/consultation.routes');
const rendezvousRoutes = require('./routes/rendezvous.routes');
// Création de l'app Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // Parser JSON
app.use(express.json());    // aussi possible (redondant avec bodyParser, on peut enlever l'un des deux)

// Définir les routes
app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/rendezvous', rendezvousRoutes);

// Exporter app
module.exports = app;
