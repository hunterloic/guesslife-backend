const error = require('../middleware/error');
const gamedefs = require('../routes/gamedefs');

module.exports = function (app) {
    app.use('/api/gamedefs', gamedefs);
    app.use(error);
}