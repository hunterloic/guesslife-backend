require('express-async-errors');
const startupDebugger = require('debug')('app:startup');
const errorDebugger = require('debug')('app:error');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const Joi = require('joi');
const winston = require('winston/lib/winston/config');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();
require('./startup/routes')(app);

process.on('uncaughtException', (ex) => {
    errorDebugger('uncaught exception', ex);
    logger.error(ex.message, ex)
    process.exit(1);
})

process.on('unhandleRejection', (ex) => {
    throw(ex);
})

mongoose.connect(
    'mongodb://localhost/guesslife', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify : false,
    })
.then(() => console.log('Connected to mongodb ...'))
.catch(() => console.log('could not connect to mongodb ...'));

console.log(`app name: ${config.get('name')}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
if(process.env.NODE_ENV == 'developement') {
    startupDebugger('morgan enabled');
    app.use(morgan('tiny'));
}


const port = process.env.GUESSLIFE_BACK_PORT || 3030;
app.listen(port, () => {
    console.log(`server started on port ${port}`, );
});
