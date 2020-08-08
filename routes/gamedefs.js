const Joi = require('joi');
const express = require('express');
const createGamedef = require('../db/gamedef');
const router = express.Router();

// get all game defs
router.get('/', (req, res) => {
    const gamedefs = 1; //todo : get from mongodb
    
    res.send({res:1});
});

// get 1 game defs
router.get('/:id', (req, res) => {
    const gamedef = 1; //todo : get from mongodb

    res.send({res:1});
});

// create 1
router.post('/', (req, res) => {

    const { error } = validateGameDef(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});

    const result = createGamedef();

    res.send(result);
});

// update 1
router.put('/:id', (req, res) => {
    const gamedef = 1; //todo : get from mongodb

    const { error } = validateGameDef(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});
    
    res.send({res:1});
});

function validateGameDef(gamedef) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(255).required(),
        author: Joi.string().min(3).max(50).required(),
        // published: Joi.boolean(),
    }

    return Joi.validate(gamedef, schema);
}

module.exports = router;