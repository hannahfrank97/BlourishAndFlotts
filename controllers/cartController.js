const cartModel = require('../models/cartModel');

function getMemberCart(req, res, next) {
    const memberId = req.member.id;

    cartModel.getMemberCart(memberId)
        .then((cartData) => {
            res.json({ cartData })
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}

function addToCart(req, res, next) {
    const memberId = req.member.id;
    const bookId = req.body.bookId;

    cartModel.addToCart(memberId, bookId)
        .then((updatedCartData) => {
            res.json({ cart: updatedCartData });
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}

function buyItems(req, res, next) {
    const memberId = req.member.id;

    cartModel.getMemberCart(memberId)
        .then((cartData) => {
            if (cartData.length > 0) {
                let cartId = cartData[0].cartId;
                cartModel.markAllItemsAsBought(cartId)
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.sendStatus(500);
                    });
            } else {
                res.status(400).send("Unfortunately we could not find a cart for this member");
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}

function removeItemFromCart(req, res, next) {
    const memberId = req.member.id;
    const bookId = req.body.bookId;

    cartModel.removeItemFromCart(memberId, bookId)
        .then((result) => {
            res.json({ message: result.message });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

module.exports = {
    getMemberCart,
    addToCart,
    buyItems,
    removeItemFromCart,
}
