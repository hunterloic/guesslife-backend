const { Gamedef, validate } = require('../models/gamedef');
const express = require('express');
const winston = require('winston');

const router = express.Router();


// get all game defs
router.get('/', async (req, res) => {
    winston.info('hey !!!!')
    throw new Error('custom error');
    const gamedefs = await Gamedef.find();
    res.send(gamedefs);
});

// get 1 game defs
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const gamedef = await Gamedef.findById(id);
    if(!gamedef) return res.status(404).send({ error: `No game def with the id ${id}` })

    res.send(gamedef);
});

// create 1
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});

    const gamedef = new Gamedef({
        name: req.body.name,
        description: req.body.name,
        author: req.body.author,
    });
    await gamedef.save();

    res.send(gamedef);
});

// update 1
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});

    const { id } = req.params;
    const gamedef = await Gamedef.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.name,
        author: req.body.author,
        updatedDateTime: new Date()
    });
    if(!gamedef) return res.status(404).send({ error: `No game def with the id ${id}` })
    
    res.send(gamedef);
});

// update 1
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const gamedef = await Gamedef.findByIdAndRemove(id);
    if(!gamedef) return res.status(404).send({ error: `No game def with the id ${id}` })
    
    res.send(gamedef);
});

module.exports = router;