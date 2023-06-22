const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const cartModel = require('../models/cartModel');
const cartController = require('../controllers/cartController');

async function checkPassword(password, hash) {
    console.log(hash);
    console.log(password);
    let pw = await bcrypt.compare(password, hash)
    console.log(pw)
    return pw;
}

async function authenticateMember({email, password}, members, res) {
    console.log('authenticate member wird ausgeführt')
    const member = members.find(u => {
        return u.email === email
    });

    console.log(email, password);
    if (member && await checkPassword(password, member.password)) {
        console.log('Username and Password correct')
        const accessToken = jwt.sign({id: member.id, name: member.username, email}, ACCESS_TOKEN_SECRET);

        console.log('Sending Cookie');
        res.cookie('accessToken', accessToken);

        res.status(200).json({'success': 'jwt was created'});
        return accessToken;
    } else {
        throw new Error('Email or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        console.log('Token was sent');
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, member) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.status(403).send('Invalid token');
            }
            req.member = member;
            next();
        });
    } else {
        console.log('Token missing!');
        return res.status(401).json({'error':'token missing', 'message':'Please send the JWT with your request'});
    }
}

function getLoggedMember(req, res, next) {
    let loggedMember = {};

    res.locals.loggedMemberId = req.cookies.loggedMemberId || null;
    res.locals.loggedMemberImg = req.cookies.loggedMemberImg || null;
    res.locals.loggedMember = req.cookies.loggedMember ? JSON.parse(req.cookies.loggedMember) : null;

    if (res.locals.loggedMember) {
        loggedMember.id = res.locals.loggedMember.id || null;
        loggedMember.memberusername = res.locals.loggedMember.memberusername || null;
        loggedMember.memberemail = res.locals.loggedMember.memberemail || null;
        loggedMember.img = res.locals.loggedMember.img || null;
    }

    console.log(loggedMember.id);
    next();
}

async function clearCartForPreviousMember(req, res, next) {
    const currentMemberId = req.member.id;
    const previousMemberId = req.cookies.loggedMemberId;

    if (currentMemberId !== previousMemberId) {
        await cartModel.clearCartForMember(previousMemberId);
    }

    next();
}

module.exports = {
    authenticateMember,
    authenticateJWT,
    getLoggedMember,
    clearCartForPreviousMember

}
