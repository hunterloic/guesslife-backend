const mongoose = require('mongoose');
const Joi = require('joi');
const logger = require('../middleware/logger');

const Gamedef = mongoose.model(
    'Gamedef', 
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50
        },
        description: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        author: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        status: {
            type: Array,
            of: String,
            required: true
        },
        createdDateTime: { type: Date, default: Date.now },
        updatedDateTime: { type: Date, default: Date.now }
    })
);

function validate(gamedef) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
        author: Joi.string().min(3).max(50).required(),
        status: Joi.array().items(Joi.string().min(3).max(50).required()).required(),
    }

    return Joi.validate(gamedef, schema);
}

module.exports = { Gamedef, validate }