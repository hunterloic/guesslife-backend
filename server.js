const startupDebugger = require('debug')('app:startup');
const gamedefs = require('./routes/gamedefs');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

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
if(app.get('env') == 'developement') {
    startupDebugger('morgan enabled');
    app.use(morgan('tiny'));
}



app.use('/api/gamedefs', gamedefs);


const port = process.env.GUESSLIFE_BACK_PORT || 3030;
app.listen(port, () => {
    console.log(`server started on port ${port}`, );
});
