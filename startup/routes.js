const error = require('../middleware/error');
const gamedefs = require('../routes/gamedefs');
const helmet = require('helmet');
const express = require('express');
const logger = require('../middleware/logger');

module.exports = function (app) {

    logger.info('config express js and routes ...');

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(helmet());

    app.use('/api/gamedefs', gamedefs);

    app.use(error);
}