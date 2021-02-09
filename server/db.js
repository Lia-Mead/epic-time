const spicedPg = require("spiced-pg");
const { dbUsername, dbPass } = require("../secrets");
const db = spicedPg(`postgres:${dbUsername}:${dbPass}@localhost:5432/social`);

module.exports.insertUserData = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};

module.exports.getLoginData = (email) => {
    const q = `SELECT users.email, users.id, users.password
    FROM users
    WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.saveCode = (email, code) => {
    const q = `INSERT INTO reset_codes (email, code)
    VALUES ($1, $2) RETURNING *`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.verifyCode = () => {
    const q = `SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp < INTERVAL '10 minutes'`;
    return db.query(q);
};

module.exports.updatePassword = (email, hashedPw) => {
    const q = `UPDATE users
    SET password = $2
    WHERE email = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};
