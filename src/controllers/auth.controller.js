const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Inscription
exports.register = async (req, res) => {
  const { email, password, role, nom, specialite, telephone, adresse } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Préparer les données à insérer
    const userData = {
      email,
      password: hashedPassword,
      role: role || 'user', // Par défaut
      nom,                  // On ajoute nom si tu veux
      specialite,           // Pour docteur par exemple
      telephone,            // Optionnel
      adresse,              // Optionnel
    };

    // Créer l'utilisateur
    const user = await prisma.user.create({ data: userData });

    return res.status(201).json({ message: 'Utilisateur créé', userId: user.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
// Connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Comparer les mots de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token
    const token = jwt.sign(
      { userId: user.id, role: user.role }, // <- Stocker aussi le role dans le token
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({ token, userId: user.id, role: user.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};
