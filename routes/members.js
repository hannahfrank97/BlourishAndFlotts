const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' }).single('image');
const membersController = require('../controllers/membersController');
const authenticationService = require('../services/authentication');
const db = require('../services/database').config;
const { config} = require('../services/database');
const path = require('path');

/*router.use(authenticationService.authenticateJWT);*/

router.get('/', membersController.getMembers);

router.get('/:id', membersController.getMember);

router.get('/:id/edit',membersController.editMember);

router.get('/:id/delete', membersController.deleteMember);

router.get('/:id/uploads', (req, res) => {
    const memberId = req.params.id;
    res.render('profilePicture', { userId: memberId }); // changed userId to memberId
})

router.post('/:id/uploads', membersController.savePicture);

module.exports = router;