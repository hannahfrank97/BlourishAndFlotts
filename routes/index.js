const express = require('express');
const membersController = require("../controllers/membersController");
const booksController = require("../controllers/booksController");
const cartController = require("../controllers/cartController");
const router = express.Router();
const authenticationService = require('../services/authentication');
const membersModel = require('../models/membersModel');
const booksRouter = require('./books');
const cartRouter = require('./cart');

router.route('/')
    .post((req, res, next) => {
        membersModel.getMembers()
            .then((members) => {
                return authenticationService.authenticateMember(req.body, members, res)
            })
            .then(authenticatedMember => {
                res.json(authenticatedMember);
            })
            .catch((err) => {
                res.status(500).json({ error: err.toString() });
            })
    });

router.get('/logout', (req, res) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.cookie('loggedMember', '', {maxAge: 0});
    res.redirect('/');
})

router.post('/register', membersController.registerMember);

router.use(authenticationService.authenticateJWT);

router.get('/cookies', (req, res, next) => {

    let counter = req.cookies['visitCounter']; // same as req.cookies.visitCounter
    console.log('Current visitCounter is at ' + counter);
    if (isNaN(counter)) counter = 0;
    counter++;
    console.log('New visitCounter is at ' + counter);
    res.cookie('visitCounter', counter, {maxAge: 2*60*60*1000});
    res.send('You have visited this page ' + counter + ' times.');
});

module.exports = router;