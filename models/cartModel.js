const db = require('../services/database').config;
const bcrypt = require('bcrypt');

//receiving the cart details of a specific member
let getMemberCart = (memberId) => new Promise((resolve, reject) => {
    const query = `
        SELECT 
            members.id AS memberId, members.username, members.email,
            cart.id AS cartId, booksList.image,
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
            SELECT items.cart_id, books.id AS bookId, books.title, books.price, SUM(items.amount) AS amount, books.image
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

//adding the book to the member´s cart and checking if the members´s cart already exists
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

let removeItemFromCart = (memberId, bookId) => {
    return new Promise((resolve, reject) => {
        const getCartIdQuery = "SELECT id FROM cart WHERE members_id = ?";
        db.query(getCartIdQuery, [memberId], function (err, cartResult) {
            if (err) {
                reject(err);
                return;
            }

            if (cartResult.length > 0) {
                const cartId = cartResult[0].id;

                const getBookInCartQuery = `
                    SELECT *
                    FROM items
                    WHERE cart_id = ? AND books_id = ?
                `;
                db.query(getBookInCartQuery, [cartId, bookId], function (err, bookResult) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (bookResult.length > 0) {
                        const amount = bookResult[0].amount;

                        if (amount > 1) {
                            const decreaseItemQuery = `
                                UPDATE items
                                SET amount = amount - 1
                                WHERE cart_id = ? AND books_id = ?
                            `;
                            db.query(decreaseItemQuery, [cartId, bookId], function (err, updateResult) {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                resolve({ message: "Decreased item quantity by 1." });
                            });
                        } else {
                            const deleteItemQuery = `
                                DELETE FROM items
                                WHERE cart_id = ? AND books_id = ?
                            `;
                            db.query(deleteItemQuery, [cartId, bookId], function (err, deleteResult) {
                                if (err) {
                                    reject(err);
                                    return;
                                }

                                resolve({ message: "Book removed from cart." });
                            });
                        }
                    } else {
                        resolve({ message: "Book not found in cart." });
                    }
                });
            } else {
                resolve({ message: "Cart not found." });
            }
        });
    });
};

//inserting the item into a member´s new cart or and updating the item´s amount if the cart already exists
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

//deleting a member´s cart
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

//items get marked as Bought within the database if the member clicks un "Buy"
function markAllItemsAsBought(cartId) {
    const query = 'UPDATE items SET isBought = 1 WHERE cart_id = ?';

    return new Promise((resolve, reject) => {
        db.query(query, [cartId], function (err, result) {
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
    markAllItemsAsBought,
    clearCartForMember,
    removeItemFromCart,
}

