const express = require('express');
const router = express.Router();
const connection = require('../connection.cjs');
const { eventNames } = require('process');

router.get('/sections', async (req, res) => {
    try{
        const sections = await connection.Section.find();
        res.json(sections);
    }
    catch(err){
        console.log(err);
    }
});

router.post('/section', async (req, res) => {
    const sectionNumber = req.body.sectionNumber;
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    try{
        const section = new connection.Section({
            sectionNumber: sectionNumber,
            title: title,
            content: content,
            image: image
        });
        await section.save();
        const sections = await connection.Section.find();

        res.json(sections);
    }
    catch(err){
        console.log(err);
    }
});

router.put('/section', async (req, res) => {
    id = req.query.id;
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    try{
        const section = await connection.Section.findByIdAndUpdate(
            id,
            {title: title, content: content, image:image},
            {new: true}
        );

        if(!section){
            return res.status(404);
        }

        res.json(section);
    }
    catch(err){
        console.log(err);
    }
});