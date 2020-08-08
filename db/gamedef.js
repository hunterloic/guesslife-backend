const mongoose = require('mongoose');

const gamedefSchema = new mongoose.Schema({
    name: String,
    description: String,
    author: String,
    createdDateTime: { type: Date, default: Date.now },
});

const Gamedef = mongoose.model('Gamedef', gamedefSchema);

async function createGamedef() {
    const gamedef = new Gamedef({
        name: 'aa',
        description: 'aa',
        author: 'aa',
    });

    const result = await gamedef.save();
    return result;
}


module.exports =  createGamedef;
