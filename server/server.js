const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
// const { hash, compare } = require("./bc");
const { hash } = require("./bc");
// const csurf = require("csurf");

const cookieSession = require("cookie-session");

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

app.get("/welcome", function (req, res) {
    // if u dont have the cookiesession middleware this code will not work
    if (req.session.UserId) {
        res.redirect("/");
    } else {
        // user is not logged in... don't redirect!
        // what happens after send file, afetr we send out html back as a response,
        //is start.js
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/registration", function (req, res) {
    console.log("post in registration");
    // hash password bcrypt
    // insert user's name, email, hashed pass into users
    // use res.json to send a response back to React
    // do NOT use res.render

    const { first, last, email, password } = req.body;
    if (first && last && email && password) {
        hash(password).then((hashedPw) => {
            db.insertUserData(first, last, email, hashedPw)
                .then(({ rows }) => {
                    // console.log("rows in register: ", rows);
                    req.session.userId = rows[0].id;
                    // console.log("cookie thing", rows[0].id);
                    // console.log("data: rows", rows);
                    // console.log("data: rows position 0", rows[0]);
                    res.json({ success: true, data: rows[0] });
                    // res.json(rows);
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
