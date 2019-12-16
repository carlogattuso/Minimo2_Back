import express from 'express'
import router from './routes/index';

let mongoose = require('mongoose');
let bodyParser = require('body-parser');

require('./models/student');
require('./models/subject');

const port: number = 3000;
const app: express.Application = express();
const server = app.listen(port);

let MONGO_URI : string = 'mongodb://localhost:27017/school';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET')
    }
    next()
});

app.use( express.json() );
app.use( '', router );
app.use( bodyParser.json() );

app.get('/', function (req, res) {
    res.send('API Working');
});

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DB');
}).catch(error => {
    console.error('Connection to DB Failed');
    console.error(error.message);
    process.exit(-1);
});

mongoose.connection.on('reconnected', () => {
    console.log('Database reconnected');
});
mongoose.connection.on('error', (err: any) => {
    console.log(`Database error: ${err.message}`);
});
mongoose.connection.on('disconnected', () => {
    console.log('Database disconnected');
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

console.log('Listening on http://localhost:' + port);

