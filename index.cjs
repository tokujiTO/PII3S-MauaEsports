const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// --- Authentication Middleware ---
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer frontendmauaesports') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// --- Load Default Data from JSON Files ---
const defaultTrains = require('./defaultTrains.json');
const defaultModalities = require('./defaultModalities.json');

// In-memory copies for runtime
let trains = JSON.parse(JSON.stringify(defaultTrains));
let modalities = JSON.parse(JSON.stringify(defaultModalities));

// --- Reset Data Every 24 Hours ---
function resetData() {
  trains = JSON.parse(JSON.stringify(defaultTrains));
  modalities = JSON.parse(JSON.stringify(defaultModalities));
  console.log('Data has been reset to default values.');
}
setInterval(resetData, 24 * 60 * 60 * 1000);

// --- API Routes ---

// GET /trains/all
// Accepts query parameters: "StartTimestamp>", "StartTimestamp<", and "Status"
app.get('/trains/all', authenticate, (req, res) => {
  let filteredTrains = trains;
  const startTimestampGt = req.query['StartTimestamp>'];
  const startTimestampLt = req.query['StartTimestamp<'];
  const status = req.query['Status'];

  if (startTimestampGt) {
    filteredTrains = filteredTrains.filter(t => t.StartTimestamp > Number(startTimestampGt));
  }
  if (startTimestampLt) {
    filteredTrains = filteredTrains.filter(t => t.StartTimestamp < Number(startTimestampLt));
  }
  if (status) {
    filteredTrains = filteredTrains.filter(t => t.Status === status);
  }

  res.json(filteredTrains);
});

// GET /modality/all
// Accepts an optional query parameter "Tag". If provided, only returns modalities with matching Tag.
app.get('/modality/all', authenticate, (req, res) => {
  const tag = req.query['Tag'];
  const result = {};
  for (const key in modalities) {
    if (modalities.hasOwnProperty(key)) {
      const mod = modalities[key];
      if (!tag || mod.Tag === tag) {
        result[key] = mod;
      }
    }
  }
  res.json(result);
});

// PATCH /modality with CRON validation
// Expects a JSON body with at least "_id" and "ScheduledTrainings"
app.patch('/modality', authenticate, (req, res) => {
  const { _id, ScheduledTrainings } = req.body;
  if (!_id) {
    return res.status(400).json({ error: 'Missing _id in request body' });
  }
  if (!modalities[_id]) {
    return res.status(404).json({ error: 'Modality not found' });
  }
  if (!Array.isArray(ScheduledTrainings)) {
    return res.status(400).json({ error: 'ScheduledTrainings must be an array' });
  }
  
  // Simple regex to validate a 6-field CRON expression (seconds, minutes, hours, day-of-month, month, day-of-week)
  const cronRegex = /^(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)$/;
  
  for (const training of ScheduledTrainings) {
    if (!training.Start || !training.End) {
      return res.status(400).json({ error: 'Each ScheduledTraining must have Start and End' });
    }
    if (!cronRegex.test(training.Start)) {
      return res.status(400).json({ error: `Invalid CRON expression for Start: ${training.Start}` });
    }
    if (!cronRegex.test(training.End)) {
      return res.status(400).json({ error: `Invalid CRON expression for End: ${training.End}` });
    }
  }

  modalities[_id].ScheduledTrainings = ScheduledTrainings;
  res.json({ message: 'Item updated' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
