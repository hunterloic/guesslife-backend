const error = require('../middleware/error');
const gamedefs = require('../routes/gamedefs');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const logger = require('../middleware/logger');

module.exports = function (app) {

    if(process.env.NODE_ENV == 'developement') {
        logger.info('morgan enabled');
        app.use(morgan('tiny'));
    }

    logger.info('config express js and routes ...');

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(helmet());

    app.use('/api/gamedefs', gamedefs);

    app.use(error);
}