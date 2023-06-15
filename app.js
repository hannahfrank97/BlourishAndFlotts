const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const db = require('./services/database'); //database
const websockets = require('./services/websockets'); // chat
const cors = require('cors');
const authenticationService = require("./services/authentication");

//for login requests
const fs = require('fs')
const morgan = require('morgan');

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/requests.log'), { flags: 'a' })
// write detailed logs into the specified file
app.use(morgan('combined', { stream: accessLogStream }))
// write short logs into the console
app.use(morgan('short'))

app.use(cors({origin:true, credentials: true}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(authenticationService.getLoggedMember);
app.use('/api', require('./routes/index'));
app.use('/api/members', require('./routes/members'));
app.use('/api/shop', require('./routes/books'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/login', require('./routes/index'));
app.use('/api', require('./routes/index'));


// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
}

app.use(errorHandler);


app.listen(3000, () => console.log(`Server running on port ${3000}`));
