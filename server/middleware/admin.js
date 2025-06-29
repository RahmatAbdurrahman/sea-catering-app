const authMiddleware = require('./auth');

const adminMiddleware = (req, res, next) => {
  // Pertama, jalankan middleware otentikasi biasa
  authMiddleware(req, res, () => {
    // Kemudian, cek peran (role) pengguna
    if (req.user && req.user.role === 'ADMIN') {
      next(); // Lanjutkan jika pengguna adalah ADMIN
    } else {
      res.status(403).json({ msg: 'Forbidden: Admin access required.' });
    }
  });
};

module.exports = adminMiddleware;