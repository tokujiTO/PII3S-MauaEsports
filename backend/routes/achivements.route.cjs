const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');

router.get('/achivements', async (req, res) => {
    const achivements = await connection.Achivement.find()
    res.json(achivements);
});

router.post('/achiviment', async (req, res) => {
    const year = req.body.year;
    const achivements = req.body.achivements;

    const achivement = new connection.Achivement({
        year: year,
        achivements: achivements
    });
    await achivement.save();
    const achivementsR = await connection.Achivement.find();

    res.json(achivementsR);
});