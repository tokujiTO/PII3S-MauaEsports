const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');

router.get('/sections', async (req, res) => {
  try {
    const sections = await connection.Section.find();
    res.json(sections);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao buscar seções' });
  }
});

router.put('/section', async (req, res) => {
  const id = req.query._id;
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image;

  try {
    const section = await connection.Section.findByIdAndUpdate(
      id,
      { title: title, content: content, image: image },
      { new: true }
    );

    if (!section) {
      return res.status(404).json({ error: 'Seção não encontrada' });
    }

    res.json(section);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Erro ao atualizar seção' });
  }
});

module.exports = router;
