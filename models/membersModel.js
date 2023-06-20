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


let updateMember = (memberData) => new Promise(async (resolve, reject)=>{
    let sql = "UPDATE members SET " + // changed users to members
        "username = " + db.escape(memberData.name) +
        ", email = " + db.escape(memberData.email) +
        " WHERE id = " + parseInt(memberData.id) + ";";

    console.log(sql);

    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err);
        }
        resolve(memberData);
    })
})

//...


let addMember = (memberData) => new Promise(async (resolve, reject) => {
    console.log('test')
    memberData.password = await bcrypt.hash(memberData.password, 10);
    let sql = "INSERT INTO members (username, email, password) VALUES " +
        "( " +
        db.escape(memberData.username) + ", " +
        db.escape(memberData.email) + ", " +
        db.escape(memberData.password) + ")";

    console.log(sql);

    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err);
        }
        resolve(memberData);
    })
});


let registerMember = (memberData) => new Promise(async (resolve, reject) => {
    console.log('memberData', memberData);
    memberData.password = await bcrypt.hash(memberData.password, 10);

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


let deleteMember = (id) => new Promise((resolve, reject)=>{

    let sql = "DELETE FROM members WHERE id = " + parseInt(id);
    db.query(sql, function (err, result, fields){
        if(err) {
            reject(err);
        }
        console.log(result.affectedRows + " rows have been deleted");
        resolve();
    })
})

let savePicture = (memberId, filename) => new Promise((resolve, reject) => {

    let sql = "UPDATE members SET `profile picture` = '" + filename + "' WHERE id = " + parseInt(memberId);
    db.query(sql, function (error, results) {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
    });
});

let getProfilePicture = (memberId) => new Promise((resolve, reject) => {

    let sql = "SELECT `profile picture` FROM members WHERE id = " + parseInt(memberId);
    db.query(sql, function (error, results) {
        if (error) {
            reject(error);
        } else {
            const filename = results[0]['profile picture'];
            const filePath = `/uploads/${filename}`;
            resolve(filePath);
        }
    });
});

module.exports = {
    getMembers,
    getMember,
    updateMember,
    addMember,
    registerMember,
    deleteMember,
    getProfilePicture,
    savePicture,
    getMemberByMail
}
