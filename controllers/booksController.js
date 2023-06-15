const booksModel = require('../models/booksModel');

function getBooks(req, res, next) {
    booksModel.getBooks()
        .then((books) => {
            res.json({books})
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}

module.exports = {
    getBooks,
}