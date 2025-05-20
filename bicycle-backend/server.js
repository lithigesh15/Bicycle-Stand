// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const commandRoutes = require('./routes/commandRoutes');
const statusRoutes = require('./routes/statusRoutes');
const logRoutes = require('./routes/logRoutes');

// Use Routes
app.use('/api/command', commandRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/logs', logRoutes);

// MongoDB Connection (clean version)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// After MongoDB connection and app setup in server.js

const checkDisconnectedCycles = async () => {
  const threshold = 5 * 60 * 1000; // 5 mins
  const now = Date.now();

  const cycles = await Cycle.find({});
  for (const cycle of cycles) {
    if (now - new Date(cycle.lastSeen).getTime() > threshold) {
      await Log.create({
        cycleId: cycle.cycleId,
        type: 'disconnect',
        message: 'Cycle disconnected due to no heartbeat',
      });
      console.log(`Cycle ${cycle.cycleId} flagged as disconnected.`);
    }
  }
};

// Run every 5 minutes
setInterval(checkDisconnectedCycles, 5 * 60 * 1000);
