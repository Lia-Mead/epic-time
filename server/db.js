const spicedPg = require("spiced-pg");
const { dbUsername, dbPass } = require("../secrets");
const db = spicedPg(`postgres:${dbUsername}:${dbPass}@localhost:5432/social`);

module.exports.insertUserData = (first, last, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`;
    const params = [first, last, email, hashedPw];
    return db.query(q, params);
};
