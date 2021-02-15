const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { hash, compare } = require("./bc");
const csurf = require("csurf");
const { sendEmail } = require("./ses");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const { uploader } = require("./upload");
const s3 = require("./s3");
const config = require("./config");

let cookie_sec;

if (process.env.sessionSecret) {
    cookie_sec = process.env.sessionSecret;
} else {
    cookie_sec = require("../secrets").sessionSecret;
}

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(express.json());

app.use(
    cookieSession({
        maxAge: 1000 * 60 * 24 * 14,
        secret: cookie_sec,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    // console.log("token: ", req.csrfToken);
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;

    db.getLoginData(email)
        .then(({ rows }) => {
            // console.log("rows in login ", rows);
            const secretCode = cryptoRandomString({
                length: 6,
            });
            const emailDb = rows[0].email;
            if (req.body.email === emailDb) {
                db.saveCode(email, secretCode)
                    .then(() => {
                        console.log("email was sent");
                        sendEmail(
                            email,
                            secretCode,
                            "Here is your reset password code"
                        )
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log(err, "error in sendEmail");
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in reset password", err);
                        res.json({ success: false });
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("err in login data", err);
            res.json({ success: false });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("I am the /password/reset/verify route");
    const { code, password } = req.body;
    db.verifyCode(code)
        .then(({ rows }) => {
            const emailCode = rows[0].email;
            // const codeDB = rows[0].code;
            let currentCode = rows.find((row) => {
                return row.code === req.body.code;
            });
            if (currentCode) {
                hash(password)
                    .then((hashedPw) => {
                        db.updatePassword(emailCode, hashedPw)
                            .then(() => {
                                // console.log("rows: ", rows);
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in insert user data", err);
                                res.json({ success: false });
                            });
                    })
                    .catch((err) => {
                        console.log("error in hashing pass: ", err);
                    });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => {
            console.log("There was an error with verifying code: ", err);
        });
});

app.get("/welcome", function (req, res) {
    // if u dont have the cookiesession middleware this code will not work
    if (req.session.UserId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", async (req, res) => {
    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        try {
            const hashedPw = await hash(password);
            const results = await db.insertUserData(
                first,
                last,
                email,
                hashedPw
            );
            req.session.userId = results.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("err in POST registration", err);
            res.json({ success: false });
        }
    } else {
        res.json({ success: false });
        // please fill out all fields error
    }
});

// app.post("/registration", function (req, res) {
//     const { first, last, email, password } = req.body;
//     if (first && last && email && password) {
//         hash(password).then((hashedPw) => {
//             db.insertUserData(first, last, email, hashedPw)
//                 .then(({ rows }) => {
//                     req.session.userId = rows[0].id;
//                     res.json({ success: true, data: rows[0] });
//                 })
//                 .catch((err) => {
//                     console.log("error in db insert reg data", err);
//                     res.json({ success: false });
//                 });
//         });
//     } else {
//         console.log("please fill out all fields");
//         res.json({ success: false });
//     }
// });

app.post("/login", function (req, res) {
    // console.log("log in");
    const { email, password } = req.body;
    db.getLoginData(email)
        .then(({ rows }) => {
            // console.log("rows in login ", rows);
            const hashedPw = rows[0].password;
            compare(password, hashedPw)
                .then((match) => {
                    if (match) {
                        req.session.userId = rows[0].id;
                        req.session.loggedIn = rows[0].id;
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("err in compare", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("err in login data", err);
            res.json({ success: false });
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get("/user.json", (req, res) => {
    // console.log("req.session.userId", req.session.userId);
    db.getProfile(req.session.userId)
        .then(({ rows }) => {
            // console.log("get user rows in 0", rows[0]);
            res.json({ success: true, rows: rows[0] });
        })
        .catch((err) => {
            console.log(err, "error in getProfile");
            res.json({ success: false });
        });
});

app.get("/show-users/:userId", (req, res) => {
    // console.log("dynamic user id route");
    const { userId } = req.params;
    // console.log("userId: ", userId);
    // console.log("cookie: ", req.session.userId);
    // console.log("match check: ", req.session.userId == userId);

    // if (req.session.userId == userId) {
    //     return res.json({ myUser: true });
    // }

    db.getProfile(userId)
        .then(({ rows }) => {
            // console.log("get user rows in 0", rows[0]);
            // is userid same as session id
            res.json({
                success: true,
                rows: rows[0],
                cookie: req.session.userId,
            });
            // res.json({ success: true, rows: rows[0] });
        })
        .catch((err) => {
            console.log(err, "error in dymaic getProfile");
            res.json({ success: false });
        });
});

app.post("/profile-pic", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("I am profile-pic");
    const { filename } = req.file;
    const fullUrl = config.s3Url + filename;
    // console.log("req.session.userId in PROFILE PIC", req.session.userId);

    if (req.file) {
        db.insertPic(req.session.userId, fullUrl)
            .then(({ rows }) => {
                // console.log("full URL", rows[0].image);
                res.json({ success: true, rows: rows[0].image });
            })
            .catch((err) => {
                console.log("error in insertPic", err);
            });
    } else {
        res.json({ success: false });
    }
});

app.get("/users", (req, res) => {
    db.threeUsers()
        .then(({ rows }) => {
            // console.log("here are the last 3 users");
            // console.log("rows: ", rows);
            res.json({ rows: rows });
        })
        .catch((err) => {
            console.log("there was an error in getting last 3 ", err);
        });
});

app.get("/find/:users", (req, res) => {
    const user = req.params.users;

    db.getMatchingUsers(user)
        .then(({ rows }) => {
            // console.log("rows in find users: ", rows);
            if (rows.length === 0) {
                res.json({ success: false, rows: [] });
            } else {
                res.json({ success: true, rows: rows });
            }
        })
        .catch((err) => {
            console.log("there was an error ingetMatchingUsers ", err);
            res.json({ success: false });
        });
});

app.post("/bio", (req, res) => {
    // console.log("I am the bio");
    const { bio } = req.body;
    db.editBio(req.session.userId, bio)
        .then(({ rows }) => {
            // console.log("edit bio rows", rows[0].bio);
            res.json({ success: true, bio: rows[0].bio });
        })
        .catch((err) => {
            console.log("error in editBio", err);
            res.json({ success: false });
        });
});

/// NEVER MOVE THIS !!!!!!!!!!!!
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
