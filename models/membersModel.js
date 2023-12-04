const { getConnection, releaseConnection } = require('../services/database');
const bcrypt = require('bcrypt');

let getMembers = () => new Promise((resolve, reject) => {
    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        db.query("SELECT * FROM members", function (err, members) {
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                resolve(members);
            }
        });
    });
});


let getMemberByMail = (mail) => new Promise((resolve, reject) => {
    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        db.query("SELECT * FROM members WHERE email = " + db.escape(mail), function (err, members) {
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                resolve(members);
            }
        });
    });
});


let getMember = (id) => new Promise((resolve, reject) => {
    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        db.query("SELECT * FROM members WHERE id = " + db.escape(id), function (err, member) {
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                resolve(member[0]);
            }
        });
    });
});

let registerMember = (memberData) => new Promise(async (resolve, reject) => {
    memberData.password = await bcrypt.hash(memberData.password, 10);

    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        let sql = "INSERT INTO members (username, email, password) VALUES (" +
            db.escape(memberData.username) + ", " +
            db.escape(memberData.email) + ", " +
            db.escape(memberData.password) + ")";

        db.query(sql, function (err, result) {
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                const newMember = {
                    id: result.insertId,
                    username: memberData.username,
                    email: memberData.email,
                    password: memberData.password,
                };
                resolve(newMember);
            }
        });
    });
});



let getMemberByToken = (token) => new Promise((resolve, reject) => {
    getConnection((err, db) => {
        if (err) {
            return reject(err);
        }

        let userId = token;
        db.query("SELECT * FROM members WHERE id = " + db.escape(userId), function (err, member) {
            releaseConnection(db);

            if (err) {
                reject(err);
            } else {
                resolve(member[0]);
            }
        });
    });
});



module.exports = {
    getMembers,
    getMember,
    registerMember,
    getMemberByMail,
    getMemberByToken,
}
