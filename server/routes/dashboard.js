const express = require('express');
const db = require('../db');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Rute untuk User Dashboard: Mendapatkan langganan milik pengguna
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const subscriptions = await db.query(
      'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(subscriptions.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk menjeda (pause) langganan
router.put('/subscriptions/:id/pause', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { pauseUntil } = req.body; // Frontend akan mengirim tanggal
    const result = await db.query(
      "UPDATE subscriptions SET status = 'paused', paused_until = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [pauseUntil, id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rute untuk membatalkan (cancel) langganan
router.put('/subscriptions/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "UPDATE subscriptions SET status = 'cancelled' WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Rute untuk Admin Dashboard: Mendapatkan metrik bisnis
router.get('/admin', adminMiddleware, async (req, res) => {
  try {
    const { startDate, endDate } = req.query; // e.g., '2025-06-01', '2025-06-30'

    // Metrik 1: New Subscriptions
    const newSubsResult = await db.query(
      'SELECT COUNT(*) FROM subscriptions WHERE created_at BETWEEN $1 AND $2',
      [startDate, endDate]
    );

    // Metrik 2: Monthly Recurring Revenue (MRR) - Disederhanakan
    const mrrResult = await db.query(
      "SELECT SUM(total_price) FROM subscriptions WHERE status = 'active'"
    );
    
    // Metrik 3: Subscription Growth (Total Active)
    const growthResult = await db.query(
      "SELECT COUNT(*) FROM subscriptions WHERE status = 'active'"
    );

    res.json({
      newSubscriptions: newSubsResult.rows[0].count,
      mrr: mrrResult.rows[0].sum,
      totalActiveSubscriptions: growthResult.rows[0].count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;