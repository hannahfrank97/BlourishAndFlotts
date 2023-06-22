const membersModel = require('../models/membersModel');
const { getProfilePicture } = require('../models/membersModel');
const path = require("path");
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
function registerMember(req, res, next) {
    const imagePath = '/images/logo.png';
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

function getUserData(req, res, next) {
    if (!req.cookies['accessToken']) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    membersModel.getMemberByToken(req.cookies['accessToken'])
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Filter out sensitive data
            const { password, ...userData } = user;

            res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
}

module.exports = {
    getMembers,
    getMember,
    registerMember,
    getUserData,
}
