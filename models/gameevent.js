const mongoose = require('mongoose');
const Joi = require('joi');

const EventActionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    result: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    statusChange: {
        type: Array,
        of: Number,
        required: true
    }
});

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
        yesAction: {
            type: EventActionSchema,
            required: true,
        },
        noAction: {
            type: EventActionSchema,
            required: true,
        },
        createdDateTime: { type: Date, default: Date.now },
        updatedDateTime: { type: Date, default: Date.now }
    })
);

function validate(gameevent) {
    const actionSchema = {
        description: Joi.string().min(3).max(255).required(),
        result: Joi.string().min(3).max(255).required(),
        statusChange: Joi.array().items(Joi.number().required()).required(),
    }
    const eventSchema = {
        description: Joi.string().min(3).max(255).required(),
        gamedef: Joi.ObjectId().required(),
        yesAction: actionSchema,
        noAction: actionSchema
    }

    return Joi.validate(gameevent, eventSchema);
}

module.exports = { Gameevent, validate }