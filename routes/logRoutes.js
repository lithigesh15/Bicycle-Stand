// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// GET /api/logs/:cycleId - Get all logs for a specific cycle
router.get('/:cycleId', async (req, res) => {
  try {
    const logs = await Log.find({ cycleId: req.params.cycleId }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router;
