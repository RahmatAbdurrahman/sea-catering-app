require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Mem-parsing body request sebagai JSON

// Gunakan Rute
app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);

// Rute untuk cek status API
app.get('/', (req, res) => {
  res.send('SEA Catering API is running!');
});

// Lindungi endpoint langganan dengan middleware 
app.post('/api/subscriptions', authMiddleware, async (req, res) => {
  try {
    // Ambil user id dari token yang sudah di-decode oleh middleware
    const userId = req.user.id; 
    const { fullName, phoneNumber, plan, mealTypes, deliveryDays, allergies, totalPrice } = req.body;
    
    // Simpan ke database menggunakan parameterized query untuk mencegah SQL Injection [cite: 61]
    const newSubscription = await db.query(
      `INSERT INTO subscriptions (user_id, full_name, phone_number, plan_name, meal_types, delivery_days, allergies, total_price) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, fullName, phoneNumber, plan, JSON.stringify(mealTypes), JSON.stringify(deliveryDays), allergies, totalPrice]
    );
    
    res.status(201).json(newSubscription.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});