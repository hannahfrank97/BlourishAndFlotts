const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);

router.get('/:id', cartController.getMemberCart);

module.exports = router;