const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

async function checkPassword(password, hash) {
    let pw = await bcrypt.compare(password, hash)
    return pw;
}

async function authenticateMember({email, password}, members, res) {
    const member = members.find(u => {
        return u.email === email
    });
    if (member && await checkPassword(password, member.password)) {
        console.log('test')
        const accessToken = jwt.sign({id: member.id, name: member.username}, ACCESS_TOKEN_SECRET);
        const loggedMember = {id: member.id, username: member.username, img: member['profile picture']};

        res.cookie('accessToken', accessToken);
        res.cookie('loggedMember', JSON.stringify(loggedMember));
        res.cookie('loggedMemberImg', JSON.stringify(member['profile picture']));
        res.cookie('loggedMemberId', JSON.stringify(member.id));
        res.send();

        return loggedMember;
    } else {
        throw new Error('Membername or password incorrect');
    }
}

function authenticateJWT(req, res, next) {
    const token = req.cookies['accessToken'];

    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, member) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }
            req.member = member;
            next();
        });
    } else {
        return res.status(401).send('No token provided');
    }
}

function getLoggedMember(req, res, next) {
    let loggedMember = {};

    res.locals.loggedMemberId = req.cookies.loggedMemberId || null;
    res.locals.loggedMemberImg = req.cookies.loggedMemberImg || null;
    res.locals.loggedMember = req.cookies.loggedMember || null;

    loggedMember.id = res.locals.loggedMember.id || null;
    loggedMember.memberusername = res.locals.loggedMember.memberusername || null;
    loggedMember.img = res.locals.loggedMember.img || null;

    console.log(loggedMember.id);
    next();
}


module.exports = {
    authenticateMember,
    authenticateJWT,
    getLoggedMember,
}
