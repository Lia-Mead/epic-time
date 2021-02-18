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

module.exports.getProfile = (id) => {
    const q = `SELECT id, first, last, image, bio FROM users
    WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};

module.exports.insertPic = (id, profilePic) => {
    const q = `UPDATE users
    SET image = $2
    WHERE id = $1 RETURNING image`;
    const params = [id, profilePic];
    return db.query(q, params);
};

module.exports.editBio = (id, bio) => {
    const q = `UPDATE users
    SET bio = $2
    WHERE id = $1 RETURNING bio`;
    const params = [id, bio];
    return db.query(q, params);
};

module.exports.getMatchingUsers = (val) => {
    return db.query(
        `SELECT id, first, last, image FROM users WHERE first ILIKE $1 OR last ILIKE $1`,
        [val + "%"]
    );
};

module.exports.threeUsers = () => {
    const q = `SELECT id, first, last, image FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.checkFriendStatus = (recipient_id, sender_id) => {
    const q = `SELECT * FROM friendships WHERE (recipient_id = $1 AND sender_id = $2) OR (recipient_id = $2 AND sender_id = $1)`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.createFriendship = (recipient_id, sender_id) => {
    const q = `INSERT INTO friendships (recipient_id, sender_id)
    VALUES ($1, $2) RETURNING *`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.unfriend = (recipient_id, sender_id) => {
    const q = `DELETE FROM friendships WHERE (recipient_id=$1 AND sender_id=$2) OR (recipient_id=$2 AND sender_id=$1)`;
    const params = [recipient_id, sender_id];
    return db.query(q, params);
};

module.exports.acceptFriendship = (senderId, recipientId) => {
    const q = `UPDATE friendships
    SET accepted = true
    WHERE sender_id = $1 AND recipient_id = $2 OR recipient_id = $1 AND sender_id = $2
    RETURNING accepted`;
    const params = [senderId, recipientId];
    return db.query(q, params);
};

module.exports.showFriends = () => {
    const q = `SELECT users.id, first, last, image, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND requester_id = $1 AND recipient_id = users.id)`;
    // const params = [];
    return db.query(q);
};
