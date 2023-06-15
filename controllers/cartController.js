const cartModel = require('../models/cartModel');

function getCart(req, res, next) {
    cartModel.getCart()
        .then((cart) => {
            res.json({ cart })
            next();
        })
        .catch((err) => {
            res.sendStatus(500);
            next();
        });
}


function getMemberCart(req, res, next) {
    const memberId = req.params.id;

    cartModel.getMemberCart(memberId)
        .then((cartData) => {
            res.json({ cartData })
            next();
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
            next();
        });
}




module.exports = {
    getCart,
    getMemberCart
}
