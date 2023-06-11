const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const path = require('path');
const db = require('./services/database'); //database
const websockets = require('./services/websockets'); // chat
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up your routes here
app.get('/', (req, res) => res.send('Hello World!'));

// Set up your server to listen on a specific port
app.listen(port, () => console.log(`Server running on port ${3000}`));