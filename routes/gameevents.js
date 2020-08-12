const { Gameevent, validate } = require('../models/gameevent');
const express = require('express');
var _ = require('lodash');

const router = express.Router();

// get all by gamedef
router.get('/findByGamedefId/:id', async (req, res) => {
    const { id } = req.params;
    const gameevents = await Gameevent.find({ gamedef: id });
    res.send(gameevents);
});

// get 1
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const gameevent = await Gameevent.findById(id);
    if(!gameevent) return res.status(404).send({ error: `No game event with the id ${id}` })

    res.send(gameevent);
});

// create 1
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});

    const gameevent = new Gameevent({
        description: req.body.description,
        gamedef: req.body.gamedef,
        yesAction: _.cloneDeep(req.body.yesAction),
        noAction: _.cloneDeep(req.body.noAction),
    });
    await gameevent.save();

    res.send(gameevent);
});

// update 1
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({error : error.details[0].message});

    const { id } = req.params;
    const gameevent = await Gameevent.findByIdAndUpdate(id, {
        description: req.body.description,
        gamedef: req.body.gamedef,
        yesAction: _.cloneDeep(req.body.yesAction),
        noAction: _.cloneDeep(req.body.noAction),
        updatedDateTime: new Date()
    }, {new: true});
    if(!gameevent) return res.status(404).send({ error: `No game event with the id ${id}` })
    
    res.send(gameevent);
});

// delete 1
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const gameevent = await Gameevent.findByIdAndRemove(id);
    if(!gameevent) return res.status(404).send({ error: `No game event with the id ${id}` })
    
    res.send(gameevent);
});

module.exports = router;