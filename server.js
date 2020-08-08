require('express-async-errors');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

logger.info(`app name: ${config.get('name')}`);
logger.info(`env: ${app.get('env')}`);

require('./startup/routes')(app);
require('./startup/db')();

process.on('uncaughtException', (ex) => {
    logger.error(ex.message, ex)
    process.exit(1);
})

process.on('unhandleRejection', (ex) => {
    throw(ex);
})




if(process.env.NODE_ENV == 'developement') {
    logger.info('morgan enabled');
    app.use(morgan('tiny'));
}


const port = process.env.GUESSLIFE_BACK_PORT || 3030;
app.listen(port, () => {
    console.log(`server started on port ${port}`, );
});
