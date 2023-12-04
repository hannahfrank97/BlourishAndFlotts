const { getConnection, releaseConnection } = require('../services/database');
const bcrypt = require('bcrypt');

let getBooks = () => new Promise((resolve, reject) => {
    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        db.query("SELECT * FROM books", function (err, books, fields) {
            // Release the connection back to the pool
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                resolve(books);
            }
        });
    });
});

module.exports = {
    getBooks,
};