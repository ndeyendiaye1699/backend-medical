const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password, role, nom, specialite, telephone, adresse } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || 'user',
        nom,
        specialite,
        telephone,
        adresse,
      },
    });

    res.status(201).json({ message: 'Utilisateur créé', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, userId: user.id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.user;
  const { nom, email, password, telephone, adresse } = req.body;

  try {
    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;
    if (telephone) updateData.telephone = telephone;
    if (adresse) updateData.adresse = adresse;
    if (password && password.trim()) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        nom: true,
        role: true,
        telephone: true,
        adresse: true,
      },
    });

    res.status(200).json({ message: 'Profil mis à jour avec succès', user: updatedUser });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

exports.getCurrentUser = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nom: true,
        role: true,
        telephone: true,
        adresse: true,
      },
    });

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nom: true,
        role: true,
        telephone: true,
        adresse: true,
      },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
};
