const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require("uuid");
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' }).single('image');
const membersController = require('../controllers/membersController');
const authenticationService = require('../services/authentication');
const membersModel = require('../models/membersModel');
const db = require('../services/database').config;
const { config} = require('../services/database');
const path = require('path');
const bcrypt = require('bcrypt')

router.use(authenticationService.authenticateJWT);

router.get('/', membersController.getMembers);

router.get('/:id', membersController.getMember);

router.get('/:id/edit',membersController.editMember);

router.get('/:id/delete', membersController.deleteMember);

module.exports = router;