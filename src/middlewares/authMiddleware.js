const jwt = require('jsonwebtoken');

// Middleware d'authentification
exports.protect = (req, res, next) => {
  let token;

  // Récupérer le token dans Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, pas de token' });
  }

  try {
    // Vérifier et décoder
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // tu peux accéder à req.user dans ta route ensuite
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token invalide' });
  }
};
