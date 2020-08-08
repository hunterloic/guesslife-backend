require('express-async-errors');
const config = require('config');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();

require('./startup/process')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

logger.info(`app name: ${config.get('name')}`);
logger.info(`env: ${app.get('env')}`);

const port = process.env.GUESSLIFE_BACK_PORT || 3030;
app.listen(port, () => {
    logger.info(`server started on port ${port}`, );
});
