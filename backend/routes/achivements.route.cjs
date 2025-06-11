const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');

router.get('/achivements', async (req, res) => {
  try {
    const achivements = await connection.Achivement.find();
    if (!achivements) {
      return res
        .status(404)
        .json({ mensagem: 'Nenhum achivement encontrado.' });
    }
    res.json(achivements);
  } catch (err) {
    console.error('Erro ao buscar achivements:', err);
    res.status(500).json({ mensagem: 'Erro ao buscar achivements.' });
  }
});

router.delete('/achiviment', async (req, res) => {
  const id = req.query.id;
  try {
    const achivement = await connection.Achivement.findByIdAndDelete(id);
    if (!achivement) {
      return res.status(404).json({ mensagem: 'Achivement não encontrado.' });
    }
    res.json({ mensagem: 'Achivement deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar achivement:', err);
    res.status(500).json({ mensagem: 'Erro ao deletar achivement.' });
  }
});

router.put('/achiviment', async (req, res) => {
  const id = req.query.id;
  const year = req.body.year;
  const achivements = req.body.achivements;

  try {
    const achivement = await connection.Achivement.findByIdAndUpdate(
      id,
      { year: year, achivements: achivements },
      { new: true }
    );

    if (!achivement) {
      return res.status(404).json({ mensagem: 'Achivement não encontrado.' });
    }

    res.json(achivement);
  } catch (err) {
    console.error('Erro ao atualizar achivement:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar achivement.' });
  }
});

router.post('/achiviment', async (req, res) => {
  const year = req.body.year;
  const achivements = req.body.achivements;

  const achivement = new connection.Achivement({
    year: year,
    achivements: achivements,
  });
  await achivement.save();
  const achivementsR = await connection.Achivement.find();

  res.json(achivementsR);
});

module.exports = router;
