const db = require('../services/database').config;
const bcrypt = require('bcrypt');

let getCart = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM cart", function (err, cart, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(cart);
        }
    });
});


let getMemberCart = (memberId) => new Promise((resolve, reject) => {
    const query = `
        SELECT members.id AS memberId, members.username, members.email, 
               books.id AS bookId, books.title, books.price, 
               cart.amount
        FROM cart
        JOIN members ON cart.members_id = members.id
        JOIN books ON cart.books_id = books.id
        WHERE members.id = ?
    `;

    db.query(query, [memberId], function (err, cartData) {
        if (err) {
            reject(err);
        } else {
            resolve(cartData);
        }
    });
});



module.exports = {
    getCart,
    getMemberCart,
}