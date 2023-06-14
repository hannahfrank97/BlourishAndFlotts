const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const db = require('./services/database'); //database
const websockets = require('./services/websockets'); // chat
const cors = require('cors');

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/members', require('./routes/members'));


// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


function errorHandler(err, req, res, next) {
    res.render('error', { error: err });
}

app.use(errorHandler);

app.listen(3000, () => console.log(`Server running on port ${3000}`));
