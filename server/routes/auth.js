const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Pastikan db.js sudah dibuat dari Level 3

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

// Rute Registrasi
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validasi input
    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    [cite_start]// Validasi kompleksitas password [cite: 54]
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ msg: 'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.' });
    }

    // Cek jika user sudah ada
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    [cite_start]// Hash password [cite: 55]
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Simpan user baru
    const newUser = await db.query(
      'INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, role',
      [fullName, email, passwordHash]
    );

    // Buat JWT
    const token = jwt.sign({ id: newUser.rows[0].id, role: newUser.rows[0].role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser.rows[0] });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Cek user
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Buat JWT
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;