const db = require('../services/database').config;
const bcrypt
    = require('bcrypt');

let getBooks = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM books", function (err, books, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(books);
        }
    });
});

module.exports = {
    getBooks,

}