const db = require('../services/database').config;
const bcrypt = require('bcrypt');

let addToCart = (memberId, bookId) => {
    return new Promise((resolve, reject) => {
        const getCartIdQuery = "SELECT id FROM cart WHERE members_id = ?";
        db.query(getCartIdQuery, [memberId], function (err, cartResult) {
            if (err) {
                reject(err);
                return;
            }

            let cartId;
            if (cartResult.length > 0) {
                cartId = cartResult[0].id;
                insertOrUpdateItem(cartId, bookId, resolve, reject);
            } else {
                const createCartQuery = "INSERT INTO cart (members_id) VALUES (?)";
                db.query(createCartQuery, [memberId], function (err, createResult) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    cartId = createResult.insertId;
                    insertOrUpdateItem(cartId, bookId, resolve, reject);
                });
            }
        });
    });
};

let getMemberCart = (memberId) => new Promise((resolve, reject) => {
    const query = `
        SELECT 
            members.id AS memberId, members.username, members.email,
            cart.id AS cartId,
            (
                SELECT SUM(books.price * items.amount) 
                FROM items 
                INNER JOIN books ON items.books_id = books.id
                WHERE items.cart_id = cart.id
            ) AS totalPrice,
            booksList.bookId, booksList.title, booksList.price, booksList.amount
        FROM cart
        INNER JOIN members ON cart.members_id = members.id
        INNER JOIN (
            SELECT items.cart_id, books.id AS bookId, books.title, books.price, SUM(items.amount) AS amount
            FROM items 
            INNER JOIN books ON items.books_id = books.id
            GROUP BY items.cart_id, books.id
        ) AS booksList ON booksList.cart_id = cart.id
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

function insertOrUpdateItem(cartId, bookId, resolve, reject) {
    const checkBookQuery = "SELECT * FROM items WHERE cart_id = ? AND books_id = ?";
    db.query(checkBookQuery, [cartId, bookId], function (err, result) {
        if (err) {
            reject(err);
            return;
        }

        if (result.length > 0) {
            const updateAmountQuery = "UPDATE items SET amount = amount + 1 WHERE cart_id = ? AND books_id = ?";
            db.query(updateAmountQuery, [cartId, bookId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } else {
            const addItemQuery = "INSERT INTO items (cart_id, books_id, amount, isBought) VALUES (?, ?, 1, 0)";

            db.query(addItemQuery, [cartId, bookId], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
}

function clearCartForMember(memberId) {
    return new Promise((resolve, reject) => {
        const clearCartQuery = 'DELETE FROM cart WHERE members_id = ?';
        db.query(clearCartQuery, [memberId], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function markItemsAsBought(cartId, itemIds) {
    const query = 'UPDATE items SET isBought = 1 WHERE cart_id = ? AND books_id IN (?)';
    const params = [cartId, itemIds];  // Updated parameter

    return new Promise((resolve, reject) => {
        db.query(query, params, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

}


module.exports = {
    addToCart,
    getMemberCart,
    markItemsAsBought,
    clearCartForMember
}

