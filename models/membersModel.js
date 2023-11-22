const db = require('../services/database').config;
const bcrypt
    = require('bcrypt');

let getMembers = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM members", function (err, members, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(members);
        }
    })
})

let getMemberByMail = (mail) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM members WHERE email = "+db.escape(mail), function (err, members, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(members);
        }
    })
})

let getMember = (id) => new Promise((resolve, reject) => {
    db.query("SELECT * FROM members WHERE id =" + id, function (err, member, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(member[0]);
        }
    })
})

let registerMember = (memberData) => new Promise(async (resolve, reject) => {
    memberData.password = await bcrypt.hash(memberData.password, 10);

    let imagePath = "/images/logo.png";

    let sql = "INSERT INTO members (username, email, password) VALUES " +
        "( " +
        db.escape(memberData.username) + ", " +
        db.escape(memberData.email) + ", " +
        db.escape(memberData.password) + ")";



    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err);
        }
        else {
            const newMember = {
                id: result.insertId,
                username: memberData.username,
                email: memberData.email,
                password: memberData.password,
            };
            resolve(newMember);
        }
    })
});


let getMemberByToken = (token) => new Promise((resolve, reject) => {
    let userId = token;

    db.query("SELECT * FROM members WHERE id =" + db.escape(userId), function (err, member, fields) {
        if (err) {
            reject(err);
        } else {
            resolve(member[0]);
        }
    })
});


module.exports = {
    getMembers,
    getMember,
    registerMember,
    getMemberByMail,
    getMemberByToken,
}
