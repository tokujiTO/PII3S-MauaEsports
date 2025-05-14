const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connection = require('./backend/connection.cjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

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

// player
app.get('/players', async (req, res) => {
  const players = await connection.Player.find();
  res.json(players);
});

app.get('/player', async (req, res) => {
  const ra = req.query.ra || req.query.raAntigo;

  const playerExists = await connection.Player.findOne({ra: ra});
  if(!playerExists){
    return res.status(401).json({ mensagem: "Usuário não existe" });
  }
  
  res.json(playerExists);
});

app.post('/player', async (req, res) => {
  const nome = req.body.nome;
  const nickname = req.body.nickname;
  const ra = req.body.ra;
  const area = req.body.area;
  const cargo = req.body.cargo;

  const player = new connection.Player({nome: nome, nickname: nickname, ra: ra, area: area, cargo:cargo});
  await player.save();
  const players = await connection.Player.find();

  res.json(players);
});

app.put('/player', async (req, res) =>{
  const { _id, ra, nome, cargo } = req.body;
  const playerExists = await connection.Player.findById(_id);

  if (!playerExists) {
    return res.status(404).json({ erro: 'Membro com esse RA não foi encontrado.' });
  }
  
  if (!ra) {
    return res.status(400).json({ erro: 'RA é obrigatório.' });
  }

  try {
    const membroAtualizado = await connection.Player.findByIdAndUpdate(
      _id ,
      { $set: {ra, nome, cargo} },
      { new: true }
    );

    if (!membroAtualizado) {
      return res.status(404).json({ erro: 'Membro não encontrado.' });
    }

    res.status(200).json(membroAtualizado);
  } 
  catch (err) {
    console.error("Erro ao atualizar o membro:", err); 
    res.status(500).json({ erro: 'Erro ao atualizar o membro.' });
  }
});

app.delete('/player', async (req, res) => {
  const { _id } = req.body;
  const playerExists = await connection.Player.findById(_id);

  if (!playerExists) {
    return res.status(404).json({ erro: 'Membro com esse RA não foi encontrado.' });
  }

  try{
    await connection.Player.findByIdAndDelete(_id);
    res.status(200)
  }
  catch(err){
    console.error("Erro em apagar o membro:", err); 
    res.status(500).json({ erro: 'Erro em apagar o membro.' });
  }
});

// equipes
app.get("/equipes", async (req, res) => {
  const e_id = req.body.e_id;

  const equipeExists = await connection.Equipes.findOne({e_id:e_id});
  if(!equipeExists){
    return res.status(401).json({mensagem: "Equipe não existe"});
  }

  res.json(equipeExists);
});

app.post('/equipe', async (req, res) => {
  const nome = req.body.nome;
  const membros = req.body.membros;

  const equipe = new connection.Equipes({nome:nome, membros:membros});
  await equipe.save();
  const equipes = await connection.Equipes.find();

  res.json(equipes);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connection.connectToMongo();
