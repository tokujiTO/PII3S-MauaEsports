const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection.cjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

app.get('/player/allPublic', async (req, res) => {
  try {
    const players = await connection.Player.find({}, 'nome area');
    if (!players) {
      return res.status(404).json({ erro: 'Nenhum jogador encontrado.' });
    }
    res.json(players);
  } catch (err) {
    console.error('Erro ao buscar jogadores públicos:', err);
    res.status(500).json({ erro: 'Erro ao buscar jogadores públicos.' });
  }
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
  const { _id, ra, nome, cargo, area, nickname } = req.body;
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
    if (playerExists.ra !== ra) {
      await connection.Equipes.updateMany(
        { cap: playerExists.ra },
        { $set: { cap: ra } }
      );
      await connection.Equipes.updateMany(
        { membros: playerExists.ra },
        { $set: { 'membros.$[elem]': ra } },
        { arrayFilters: [{ elem: playerExists.ra }] }
      );
    }

    const membroAtualizado = await connection.Player.findByIdAndUpdate(
      _id,
      { $set: { ra, nome, cargo, area, nickname } },
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

app.get('/equipe', async (req, res) => {
  const ra = req.query.ra;
  if (!ra) {
    return res.status(400).json({ erro: 'RA não fornecido.' });
  }
  try {
    const equipe = await connection.Equipes.findOne({ cap: ra });
    if (!equipe) {
      return res.status(404).json({ erro: 'Equipe não encontrada.' });
    }
    const membrosDetalhados = await connection.Player.find({
      ra: { $in: equipe.membros || [] }
    });
    res.json({
      ...equipe.toObject(),
      membros: membrosDetalhados
    });
  } catch (err) {
    console.error('Erro ao buscar equipe pelo RA:', err);
    res.status(500).json({ erro: 'Erro ao buscar equipe.' });
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

app.get('/equipes/all', async (req, res) => {
  const equipes = await connection.Equipes.find();
  res.json(equipes);
});

app.delete('/equipe', async (req, res) => {
  const { _id } = req.query;
  const equipeExists = await connection.Equipes.findById(_id);
  if (!equipeExists) {
    return res.status(404).json({ erro: 'Equipe não encontrada.' });
  }
  try {
    await connection.Equipes.findByIdAndDelete(_id);
    res.status(200).json({ mensagem: 'Equipe deletada com sucesso', id: _id });
  } catch (err) {
    console.error('Erro ao apagar a equipe:', err);
    res.status(500).json({ erro: 'Erro ao apagar a equipe.' });
  }
});

app.get('/equipes/allPublic', async (req, res) => {
  try {
    const equipes = await connection.Equipes.find();
    if (!equipes) {
      return res.status(404).json({ erro: 'Nenhuma equipe encontrada.' });
    }
    const equipesComNomes = await Promise.all(
      equipes.map(async (equipe) => {
        // Busca nomes dos membros
        const membrosNomes = await Promise.all(
          (equipe.membros || []).map(async (ra) => {
            const player = await connection.Player.findOne({ ra });
            return player ? player.nome : 'Desconhecido';
          })
        );
        // Busca nome do capitão
        let capNome = 'Desconhecido';
        if (equipe.cap) {
          const capPlayer = await connection.Player.findOne({ ra: equipe.cap });
          if (capPlayer) capNome = capPlayer.nome;
        }
        return {
          ...equipe.toObject(),
          membros: membrosNomes,
          cap: capNome,
        };
      })
    );
    res.json(equipesComNomes);
  } catch (err) {
    console.error('Erro ao buscar equipes públicas:', err);
    res.status(500).json({ erro: 'Erro ao buscar equipes públicas.' });
  }
});

app.put('/equipe', async (req, res) => {
  const { _id, nome, cap, image, membros, color } = req.body;
  const equipeExists = await connection.Equipes.findById(_id);
  if (!equipeExists) {
    return res.status(404).json({ erro: 'Equipe não encontrada.' });
  }
  try {
    const equipeAtualizada = await connection.Equipes.findByIdAndUpdate(
      _id,
      { $set: { nome, cap, image, membros, color } },
      { new: true }
    );
    if (!equipeAtualizada) {
      return res.status(404).json({ erro: 'Equipe não encontrada.' });
    }
    res.status(200).json(equipeAtualizada);
  } catch (err) {
    console.error('Erro ao atualizar a equipe:', err);
    res.status(500).json({ erro: 'Erro ao atualizar a equipe.' });
  }
});

app.post('/equipe', async (req, res) => {
  const nome = req.body.nome;
  const cap = req.body.cap;
  const image = req.body.image;
  const membros = req.body.membros;
  const color = req.body.color || 'gradient-to-t from-blue-500 to-white';

  const equipe = new connection.Equipes({
    cap: cap,
    nome: nome,
    image: image,
    membros: membros,
    color: color,
  });
  await equipe.save();
  const equipes = await connection.Equipes.find();

  res.json(equipes);
});

app.post('/auth/check', async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ erro: 'Token não enviado.' });
  }
  try {
    const decoded = jwt.decode(accessToken);
    if (!decoded) {
      return res.status(400).json({ erro: 'Token inválido.' });
    }

    // O campo do RA pode variar, ajuste conforme o token da sua instituição
    // Exemplos comuns: preferred_username, unique_name, upn, email
    const ra = decoded.unique_name.split('@')[0];
    if (!ra) {
      return res.status(400).json({ erro: 'RA não encontrado no token.' });
    }

    // Procura o usuário pelo RA
    const user = await connection.Player.findOne({ ra: ra });
    if (!user) {
      return res
        .status(404)
        .json({ existe: false, mensagem: 'Usuário não encontrado.' });
    }

    return res.json({ existe: true, usuario: user });
  } catch (err) {
    console.error('Erro ao checar token:', err);
    return res.status(500).json({ erro: 'Erro interno ao checar token.' });
  }
});

module.exports = app;
