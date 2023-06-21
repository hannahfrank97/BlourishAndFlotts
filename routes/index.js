const express = require('express');
const membersController = require("../controllers/membersController");
const booksController = require("../controllers/booksController");
const cartController = require("../controllers/cartController");
const router = express.Router();
const authenticationService = require('../services/authentication');
const membersModel = require('../models/membersModel');
const booksRouter = require('./books');
const cartRouter = require('./cart');
const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => res.send({'message':'Welcome to the API of Blourish and Flotts'}));
router.route('/login')
    .get((req, res, next) => res.status(401).json({'error':'wrong http request','message':'please use a post request'}))
    .post((req, res, next) => {
        const {email, password} = req.body;
        console.log("User",email,"trying to login with", password);
        if(email && password) {
            membersModel.getMemberByMail(email)
                .then((member) => {
                     authenticationService.authenticateMember(req.body, member, res);
                })
                /*.then(authenticatedMember => {
                    res.json(authenticatedMember);
                })*/
                .catch((err) => {
                    res.status(500).json({error: err.toString()});
                    console.error(err);
                })
            console.log('BISCHDRIN');
        } else
            res.status(401).json({'error':'missing data', 'message':'please include email and password in the request'})
    });

router.post('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.end();
})

router.get('/isLoggedIn', (req, res) => {
    if (req.cookies['accessToken']) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});





router.post('/register', membersController.registerMember);

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