const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authenticationService = require("../services/authentication");

router.use(authenticationService.authenticateJWT);
router.use(authenticationService.clearCartForPreviousMember);

router.get('/', authenticationService.clearCartForPreviousMember, (req, res, next) => {
    res.locals.meta = { requiresAuth: true };
    next();
}, cartController.getMemberCart);

router.post('/', authenticationService.clearCartForPreviousMember, (req, res, next) => {
    res.locals.meta = { requiresAuth: true };
    next();
}, cartController.addToCart);


router.post('/buy', authenticationService.clearCartForPreviousMember, (req, res, next) => {
    res.locals.meta = { requiresAuth: true };
    next();
}, cartController.buyItems);


module.exports = router;