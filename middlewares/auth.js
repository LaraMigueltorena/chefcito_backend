const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, 'CLAVE_SECRETA'); // 🔐 Cambiá por env segura si querés HAY QUE CAMBIARLOOO
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
