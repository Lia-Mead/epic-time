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
    // this runs when the user enters their email in ResetPassword
    // 1. verift the email the user entered actually exists in users
    // 2. send the email to that user if their email is valid
    // - generate a secret code and send it to user
    // - we're also gonna store the secret code somewhere
    // how to verify the email address
    // query the users tabble to see if teh email exists in it
    // scret code stuff

    // we need a new table for the secret code

    // use send email to send an email to this user
    // when calling sendEmail, ermemeber to pass it the email of the recipient
    // secret code, and subject of email
    // 1. everythign went well
    // 2. sth went wrong
});

app.post("/password/reset/verify", (req, res) => {
    console.log("verify password");

    const { code, password } = req.body;

    db.verifyCode(code)
        .then(({ rows }) => {
            console.log("rows in verifyCode", rows);
            const emailCode = rows[0].email;
            // console.log("email", emailCode);

            let currentCode = rows.find((row) => {
                return row.code === req.body.code;
            });
            // console.log("rows[0].code"), rows[0].code;
            // console.log("req.bodycode"), req.body.code;
            if (currentCode) {
                hash(password).then((hashedPw) => {
                    db.updatePassword(emailCode, hashedPw)
                        .then(() => {
                            res.json({ success: true });
                        })
                        .catch((err) => {
                            console.log("error in db updatePassword", err);
                            res.json({ success: false });
                        });
                });
            }
        })
        .catch((err) => {
            console.log(err, "error in verifyCode");
            res.json({ success: false });
        });
    // 1. go to reset_code and retrieve the code stores there for the user
    //SELECT * FROM my_table
    // WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
    // if expired
    // if not expired
    // match
    // don't match
});

// app.post("/some-route", (req, res) => {
//     sendEmail(
//         "meadowsliat@gmail.com",
//         "123564573",
//         "Here is your reset password code"
//     )
//         .then(() => {
//             console.log("yay");
//         })
//         .catch((err) => {
//             console.log("error in reset password", err);
//         });
// });

app.get("/welcome", function (req, res) {
    // if u dont have the cookiesession middleware this code will not work
    if (req.session.UserId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", function (req, res) {
    // console.log("post in registration");
    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(password).then((hashedPw) => {
            db.insertUserData(first, last, email, hashedPw)
                .then(({ rows }) => {
                    // console.log("rows in register: ", rows);
                    req.session.userId = rows[0].id;
                    // console.log("cookie thing", rows[0].id);
                    // console.log("data: rows position 0", rows[0]);
                    res.json({ success: true, data: rows[0] });
                })
                .catch((err) => {
                    console.log("error in db insert reg data", err);
                    res.json({ success: false });
                });
        });
    } else {
        console.log("please fill out all fields");
        res.json({ success: false });
    }
});

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

app.get("*", function (req, res) {
    if (!req.session.userId) {
        // if user not logged in redirect to welcome
        res.redirect("/welcome");
    } else {
        // if user logged in send over the html
        // once the client has the HTML start.js will render the <p>
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
