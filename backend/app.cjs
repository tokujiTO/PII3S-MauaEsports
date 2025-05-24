const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection.cjs');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// player
app.get('/players', async (req, res) => {
  const players = await connection.Player.find();
  res.json(players);
});

app.get('/player', async (req, res) => {
  const ra = req.query.ra || req.query.raAntigo;

  const playerExists = await connection.Player.findOne({ ra: ra });
  if (!playerExists) {
    return res.status(401).json({ mensagem: 'Usuário não existe' });
  }

  res.json(playerExists);
});

app.post('/player', async (req, res) => {
  const nome = req.body.nome;
  const nickname = req.body.nickname;
  const ra = req.body.ra;
  const area = req.body.area;
  const cargo = req.body.cargo;

  const player = new connection.Player({
    nome: nome,
    nickname: nickname,
    ra: ra,
    area: area,
    cargo: cargo,
  });
  await player.save();
  const players = await connection.Player.find();

  res.json(players);
});

app.put('/player', async (req, res) => {
  const { _id, ra, nome, cargo } = req.body;
  const playerExists = await connection.Player.findById(_id);

  if (!playerExists) {
    return res
      .status(404)
      .json({ erro: 'Membro com esse RA não foi encontrado.' });
  }

  if (!ra) {
    return res.status(400).json({ erro: 'RA é obrigatório.' });
  }

  try {
    const membroAtualizado = await connection.Player.findByIdAndUpdate(
      _id,
      { $set: { ra, nome, cargo } },
      { new: true }
    );

    if (!membroAtualizado) {
      return res.status(404).json({ erro: 'Membro não encontrado.' });
    }

    res.status(200).json(membroAtualizado);
  } catch (err) {
    console.error('Erro ao atualizar o membro:', err);
    res.status(500).json({ erro: 'Erro ao atualizar o membro.' });
  }
});

app.delete('/player', async (req, res) => {
  const { _id } = req.body;
  const playerExists = await connection.Player.findById(_id);

  if (!playerExists) {
    return res
      .status(404)
      .json({ erro: 'Membro com esse RA não foi encontrado.' });
  }

  try {
    await connection.Player.findByIdAndDelete(_id);
    res.status(200).json({ mensagem: 'Membro deletado com sucesso', id: _id });
  } catch (err) {
    console.error('Erro em apagar o membro:', err);
    res.status(500).json({ erro: 'Erro em apagar o membro.' });
  }
});

// equipes
app.get('/equipes', async (req, res) => {
  const e_id = req.body.e_id;

  const equipeExists = await connection.Equipes.findOne({ e_id: e_id });
  if (!equipeExists) {
    return res.status(401).json({ mensagem: 'Equipe não existe' });
  }

  res.json(equipeExists);
});

app.post('/equipe', async (req, res) => {
  const nome = req.body.nome;
  const membros = req.body.membros;

  const equipe = new connection.Equipes({ nome: nome, membros: membros });
  await equipe.save();
  const equipes = await connection.Equipes.find();

  res.json(equipes);
});

module.exports = app;
