const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');

router.get('/eventosPublic', async (req, res) => {
  const now = Date.now();
  const eventos = await connection.Evento.find({ data: { $gte: now } })
    .sort({ data: 1 })
    .limit(5);
  res.json(eventos);
});

router.get('/eventos', async (req, res) => {
  const eventos = await connection.Evento.find().sort({ data: 1 });
  res.json(eventos);
});

router.post('/evento', async (req, res) => {
  const titulo = req.body.titulo;
  const data = req.body.data;
  const link = req.body.link;

  const evento = new connection.Evento({
    titulo: titulo,
    data: data,
    link: link,
  });
  await evento.save();
  const eventos = await connection.Evento.find();

  res.json(eventos);
});

router.delete('/evento', async (req, res) => {
  const id = req.query.id;
  const eventoExists = await connection.Evento.findById(id);
  if (!eventoExists) {
    return res.status(404).json({ erro: 'Evento não encontrado.' });
  }
  await connection.Evento.findByIdAndDelete(id);
  const eventos = await connection.Evento.find();
  res.json(eventos);
});

module.exports = router;
