const express = require('express');
const router = express.Router();
const Log = require('../models/Log'); // Assuming this is your Log model

// Existing GET route probably here...

// Add this POST route to create logs manually
router.post('/', async (req, res) => {
  try {
    const { cycleId, type, message, timestamp } = req.body;
    if (!cycleId || !type || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const logEntry = new Log({
      cycleId,
      type,
      message,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });
    await logEntry.save();
    res.status(201).json({ message: 'Log entry created', log: logEntry });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
