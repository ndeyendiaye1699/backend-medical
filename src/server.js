require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patientRoutes');
const consultationRoutes = require('./routes/consultation.routes');
const rendezvousRoutes = require('./routes/rendezvous.routes');
const app = express(); // Déclare ici et pas ailleurs
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/rendezvous', rendezvousRoutes);
// Port
const PORT = process.env.PORT || 5000;

// Serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
