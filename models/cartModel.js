const { pool } = require('../services/database');

// Receiving the cart details of a specific member
let getMemberCart = async (memberId) => {
    const query = `
        SELECT
            members.id AS "memberId", members.username, members.email,
            cart.id AS "cartId", booksList.image,
            (
                SELECT SUM(books.price * items.amount)
                FROM items
                INNER JOIN books ON items.books_id = books.id
                WHERE items.cart_id = cart.id
            ) AS "totalPrice",
            booksList."bookId", booksList.title, booksList.price, booksList.amount
        FROM cart
        INNER JOIN members ON cart.members_id = members.id
        INNER JOIN (
            SELECT items.cart_id, books.id AS "bookId", books.title, books.price, SUM(items.amount) AS amount, books.image
            FROM items
            INNER JOIN books ON items.books_id = books.id
            GROUP BY items.cart_id, books.id, books.title, books.price, books.image
        ) AS booksList ON booksList.cart_id = cart.id
        WHERE members.id = $1
    `;
    const result = await pool.query(query, [memberId]);
    return result.rows;
};

// Adding the book to the member's cart and checking if the member's cart already exists
let addToCart = async (memberId, bookId) => {
    // Check if cart exists for member
    const cartResult = await pool.query("SELECT id FROM cart WHERE members_id = $1", [memberId]);

    let cartId;
    if (cartResult.rows.length > 0) {
        cartId = cartResult.rows[0].id;
    } else {
        // Create new cart
        const createResult = await pool.query(
            "INSERT INTO cart (members_id) VALUES ($1) RETURNING id",
            [memberId]
        );
        cartId = createResult.rows[0].id;
    }

    // Check if book already in cart
    const checkResult = await pool.query(
        "SELECT * FROM items WHERE cart_id = $1 AND books_id = $2",
        [cartId, bookId]
    );

    if (checkResult.rows.length > 0) {
        // Update amount
        await pool.query(
            "UPDATE items SET amount = amount + 1 WHERE cart_id = $1 AND books_id = $2",
            [cartId, bookId]
        );
    } else {
        // Insert new item
        await pool.query(
            "INSERT INTO items (cart_id, books_id, amount, \"isBought\") VALUES ($1, $2, 1, false)",
            [cartId, bookId]
        );
    }
};

let removeItemFromCart = async (memberId, bookId) => {
    const cartResult = await pool.query("SELECT id FROM cart WHERE members_id = $1", [memberId]);

    if (cartResult.rows.length === 0) {
        return { message: "Cart not found." };
    }

    const cartId = cartResult.rows[0].id;

    const bookResult = await pool.query(
        "SELECT * FROM items WHERE cart_id = $1 AND books_id = $2",
        [cartId, bookId]
    );

    if (bookResult.rows.length === 0) {
        return { message: "Book not found in cart." };
    }

    const amount = bookResult.rows[0].amount;

    if (amount > 1) {
        await pool.query(
            "UPDATE items SET amount = amount - 1 WHERE cart_id = $1 AND books_id = $2",
            [cartId, bookId]
        );
        return { message: "Decreased item quantity by 1." };
    } else {
        await pool.query(
            "DELETE FROM items WHERE cart_id = $1 AND books_id = $2",
            [cartId, bookId]
        );
        return { message: "Book removed from cart." };
    }
};

// Deleting a member's cart
async function clearCartForMember(memberId) {
    await pool.query('DELETE FROM cart WHERE members_id = $1', [memberId]);
}

// Items get marked as Bought within the database if the member clicks on "Buy"
async function markAllItemsAsBought(cartId) {
    await pool.query('UPDATE items SET "isBought" = true WHERE cart_id = $1', [cartId]);
}

module.exports = {
    addToCart,
    getMemberCart,
    markAllItemsAsBought,
    clearCartForMember,
    removeItemFromCart,
};
