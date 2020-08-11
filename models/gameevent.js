const mongoose = require('mongoose');
const Joi = require('joi');

const Gameevent = mongoose.model(
    'Gameevent', 
    new mongoose.Schema({
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255
        },
        gamedef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gamedef',
            required: true,
        },
        createdDateTime: { type: Date, default: Date.now },
        updatedDateTime: { type: Date, default: Date.now }
    })
);

function validate(gameevent) {
    const schema = {
        description: Joi.string().min(3).max(255).required(),
        gamedef: Joi.ObjectId().required(),
    }

    return Joi.validate(gameevent, schema);
}

module.exports = { Gameevent, validate }