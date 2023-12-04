const express = require('express');
const router = express.Router();
const membersController = require('../controllers/membersController');
const authenticationService = require('../services/authentication');

router.use(authenticationService.authenticateJWT);

router.get('/', membersController.getMembers);

router.get('/:id', membersController.getMember);

module.exports = router;