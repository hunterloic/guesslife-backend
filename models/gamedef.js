const mongoose = require('mongoose');
const Joi = require('joi');

const Gamedef = mongoose.model(
    'Gamedef', 
    new mongoose.Schema({
        name: String,
        description: String,
        author: String,
        createdDateTime: { type: Date, default: Date.now },
        updatedDateTime: { type: Date, default: Date.now }
    })
);

function validate(gamedef) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(255).required(),
        author: Joi.string().min(3).max(50).required(),
        // published: Joi.boolean(),
    }

    return Joi.validate(gamedef, schema);
}

module.exports = { Gamedef, validate }