const cartModel = require('../models/cartModel');

function getMemberCart(req, res, next) {
    const memberId = req.member.id;

    cartModel.getMemberCart(memberId)
        .then((cartData) => {
            console.log(cartData)
            res.json({ cartData })
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}

function addToCart(req, res, next) {
    console.log('i am inside the addtocart');
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
    const itemIds = req.body.itemIds; // it's an array now

    cartModel.getMemberCart(memberId)
        .then((cartData) => {
            if (cartData.length > 0) {
                let cartId = cartData[0].cartId;
                cartModel.markItemsAsBought(cartId, itemIds) // passing the array to markItemsAsBought
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.sendStatus(500);
                    });
            } else {
                res.status(400).send("No cart found for this user");
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}

module.exports = {
    getMemberCart,
    addToCart,
    buyItems,
}
