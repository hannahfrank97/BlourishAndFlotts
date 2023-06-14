require('dotenv').config();
const mysql = require('mysql');
/*const config = mysql.createConnection({
    host: "169.254.255.253",
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});*/

const config = mysql.createConnection({
    host: "localhost",
    port: '',
    user: 'root',
    password: '',
    database: 'node_cc221009_10083',
});

config.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

module.exports = {
    config,
};