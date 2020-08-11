const logger = require('../middleware/logger');

module.exports = function() {
    
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex)
        process.exit(1);
    })

    process.on('unhandleRejection', (ex) => {
        throw(ex);
    })

}