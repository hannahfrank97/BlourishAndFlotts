const membersModel = require('../models/membersModel');
const { getProfilePicture } = require('../models/membersModel');
const path = require("path");
const {v4: uuidv4} = require("uuid");
const multer = require('multer');
const uploads = multer({ dest: 'uploads/' }).single('image');
const fs = require("fs");
const bcrypt = require('bcrypt')

function getMembers(req, res, next) {
    console.log('i am getting the members')
    membersModel.getMembers()
        .then((members) => {
            res.json({ members })
        })
        .catch((err) => {
            res.sendStatus(500)
        })
}

//Save the profilePicture in the database

function savePicture (req, res, next) {
    const memberId = req.params.id;
    const file = req.file;

    if (!file) {
        return res.status(400).json({error: 'Unfortunately we could not find an image'});
    }
    const fileExtension = path.extname(file.originalname);
    const uuidFilename = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(__dirname, '..', 'uploads', uuidFilename);
    const filename = uuidFilename;

    fs.rename(file.path, filePath, (err) => {
        if (err) {
            return res.status(500).send('Unfortunately we could not rename your file');
        }

        membersModel.savePicture(memberId, filename)

            .then(() => {
                res.redirect('/users/' + memberId);
            })
            .catch(error => res.status(500).json({error: 'Failed to save picture'}));
    });

}

// userIdToModify and authenticatedUser needs to be parsed into user.ejs for button rendering to admins and basics

function getMember(req, res, next) {
    const id = req.params.id;
    console.log(req.params.id)
    const authenticatedUser = req.user;
    Promise.all([
        membersModel.getMember(id)
    ])

        .then(([member, profilePicture]) => {
            if (!member) {
                res.status(404);
                throw new Error(' not found');
            }
            res.json({ member })
        })
        .catch((err) => {
            res.status(500);
            next(err);
        });
}

function editMember(req, res, next) {
    const authenticatedUser = req.user;
    membersModel.getMember(req.params.id)
        //.then(user => res.render('editUser', {user, authenticatedUser }))
        .catch(error => res.sendStatus(500))
}

//redirect to updatedUser, otherwise authenticatedUser is not defined in res.render('user' {user})
function updateMember(req, res, next) {
    membersModel.updateMember(req.body)
        .then(updatedMember => {
            //res.redirect(`/users/${updatedMember.id}`);
        })
        .catch(error => {
            console.error('Error in the Controller', error)
            res.sendStatus(500);
        });
}

function addMember(req, res, next) {
    membersModel.addMember(req.body)
        //.then(() => res.redirect('/users'))
        .catch(error => res.sendStatus(500))
}

function registerMember(req, res, next) {
    console.log("New member is being registered");
    console.log('req.body', req.body);
    membersModel.registerMember(req.body)
        .then((member) => {
            console.log('Registered member:', member);
            res.json({ member });
        })
        .catch(error => {
            console.error('Error in Controller', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

console.log('Before registering member'); // Add this line to check if the controller function is being executed


function deleteMember(req, res, next) {
    membersModel.deleteMember(req.params.id)
        .then(() => res.redirect('/users'))
        .catch(error => res.sendStatus(500))
}


module.exports = {
    getMembers,
    getMember,
    editMember,
    updateMember,
    addMember,
    registerMember,
    deleteMember,
    getProfilePicture,
    savePicture,
}
