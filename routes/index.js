const express = require('express');
const membersController = require("../controllers/membersController");
const router = express.Router();
const authenticationService = require('../services/authentication');
const membersModel = require('../models/membersModel');

const membersRouter = require('./members');

router
    .get('/', (req, res) => {
        res.render('index');
    })
    .post('/', (req, res, next) => {
        console.log(req.body);
        res.send('Received a POST request');
    });

// LOGIN

router.route('/login')
    .get((req, res, next) => {
        res.render('login');
    })
    .post((req, res, next) => {
        userModel.getUsers()
            .then((users) => {
                authenticationService.authenticateUser(req.body, users, res)
            })
            .catch((err) => {
                res.sendStatus(500)
            })
    });

router.get('/logout', (req, res) => {
    res.cookie('accessToken', '', {maxAge: 0});
    res.cookie('loggedUser', '', {maxAge: 0});
    res.redirect('/');
})

router.get('/register', (req, res) => {
    res.render('register');
})
router.post('/register', membersController.registerMember);


router.get('/philosophy', (req, res) => {
    res.render('philosophy');
})

router.get('/pasta', (req, res) => {
    res.render('pasta');
})

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