const mongoose = require('mongoose');
const { Gamedef : GamedefModel } = require('../models/gamedef');


async function createGamedef() {
    const gamedef = new GamedefModel({
        name: 'aa',
        description: 'aa',
        author: 'aa',
    });

    const result = await gamedef.save();
    return result;
}

module.exports =  createGamedef;
