const mongoose = require('mongoose');
const logger = require('../middleware/logger');

module.exports = function () {
    mongoose.connect(
        'mongodb://localhost/guesslife', 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify : false,
        })
    .then(() => logger.info('Connected to mongodb ...'));
}