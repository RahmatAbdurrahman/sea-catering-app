const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

module.exports = function(req, res, next) {
  // Ambil token dari header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Menambahkan payload (id, role) ke request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};