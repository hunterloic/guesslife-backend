const winston = require('winston');
const logger = require('./logger');

module.exports = function(err, req, res, next) {
    logger.error(err.message, err);
    return res.status(500).send({ error: err.message })
}