const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');

router.get('/eventos', async (req, res) => {
    const eventos = await connection.Evento.find({ data: { $gte: new Date() } })
    .sort({ data: 1 }) 
    .limit(5);
    res.json(eventos);
});

router.post('/evento', async (req, res) => {
    const titulo = req.body.titulo;
    const data = req.body.data;
    const link = req.body.link;

    const evento = new connection.Evento({
        titulo: titulo,
        data: data,
        link: link
    });
    await evento.save();
    const eventos = await connection.Evento.find();

    res.json(eventos);
});





module.exports = router;