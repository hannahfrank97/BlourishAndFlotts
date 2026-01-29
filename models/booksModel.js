const { pool } = require('../services/database');

let getBooks = async () => {
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
};

module.exports = {
    getBooks,
};
