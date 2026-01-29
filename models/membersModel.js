const { pool } = require('../services/database');
const bcrypt = require('bcrypt');

let getMembers = async () => {
    const result = await pool.query("SELECT * FROM members");
    return result.rows;
};

let getMemberByMail = async (mail) => {
    const result = await pool.query("SELECT * FROM members WHERE email = $1", [mail]);
    return result.rows;
};

let getMember = async (id) => {
    const result = await pool.query("SELECT * FROM members WHERE id = $1", [id]);
    return result.rows[0];
};

let registerMember = async (memberData) => {
    memberData.password = await bcrypt.hash(memberData.password, 10);

    const result = await pool.query(
        "INSERT INTO members (username, email, password) VALUES ($1, $2, $3) RETURNING id",
        [memberData.username, memberData.email, memberData.password]
    );

    const newMember = {
        id: result.rows[0].id,
        username: memberData.username,
        email: memberData.email,
        password: memberData.password,
    };
    return newMember;
};

let getMemberByToken = async (token) => {
    let userId = token;
    const result = await pool.query("SELECT * FROM members WHERE id = $1", [userId]);
    return result.rows[0];
};

module.exports = {
    getMembers,
    getMember,
    registerMember,
    getMemberByMail,
    getMemberByToken,
};
