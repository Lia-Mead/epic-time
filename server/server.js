const express = require("express");
const app = express();
// socket io boilerplate code
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
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

// app.use(
//     cookieSession({
//         maxAge: 1000 * 60 * 24 * 14,
//         secret: cookie_sec,
//     })
// );

const cookieSessionMW = cookieSession({
    maxAge: 1000 * 60 * 24 * 14,
    secret: cookie_sec,
});

app.use(cookieSessionMW);
io.use(function (socket, next) {
    // console.log("socket.request.url", socket.request.url);
    cookieSessionMW(socket.request, socket.request.res, next);
});

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

app.post("/delete-profile-pic", (req, res) => {
    console.log("I am delete post pic");
    db.deleteProfilePic(req.session.userId)
        .then(({ rows }) => {
            console.log("rows: ", rows);
            res.json({ success: true, rows: rows });
        })
        .catch((err) => {
            console.log(
                "there was an error with delete profile pic post: ",
                err
            );
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
    // const { userId } = req.session.userId;

    const fullUrl = config.s3Url + filename;
    // const fullUrl = `${userId}/${config.s3Url}${filename}`;
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

app.get("/check-friendship/:requestedUser", (req, res) => {
    const { requestedUser } = req.params;
    const loggedInUser = req.session.userId;
    // console.log("requestedUser", requestedUser);
    // console.log("loggedInUser", loggedInUser);

    db.checkFriendStatus(requestedUser, loggedInUser)
        .then(({ rows }) => {
            // console.log("rows: ", rows);
            // console.log("rows.accepted", rows[0].accepted);
            if (rows.length === 0) {
                res.json({
                    button: "send",
                });
            } else if (rows.length > 0 && rows[0].accepted) {
                res.json({
                    button: "end",
                });
            } else if (!rows[0].accepted) {
                if (loggedInUser == rows[0].sender_id) {
                    res.json({
                        button: "cancel",
                        accepted: false,
                    });
                } else if (loggedInUser == rows[0].recipient_id) {
                    res.json({
                        button: "accept",
                        accepted: true,
                    });
                }
            }
        })
        .catch((err) => {
            console.log("error in check-friendship", err);
            res.json({ success: false });
        });
});

app.get("/friends-wannabes", (req, res) => {
    // console.log("get friends-wannabes");
    const userId = req.session.userId;
    // console.log("userId in friends-wannabes,", userId);
    db.showFriends(userId)
        .then(({ rows }) => {
            // console.log("rows: ", rows);
            // console.log("sender", sender);
            res.json({ success: true, rows: rows });
        })
        .catch((err) => {
            console.log("error in friends-wannabes", err);
            res.json({ success: false });
        });
});

app.get("/friends-of-someoneelse/:userId", (req, res) => {
    // console.log("get friends-wannabes");
    const cookieId = req.session.userId;
    const { userId } = req.params;
    // console.log("userId in someoneelse,", userId);
    db.showFriendsOthers(userId)
        .then(({ rows }) => {
            // console.log("rows: ", rows);
            // console.log("sender", sender);
            res.json({ success: true, rows: rows, userId: cookieId });
        })
        .catch((err) => {
            console.log("error in friends-wannabes", err);
            res.json({ success: false });
        });
});

app.post("/check-friendship/:status", (req, res) => {
    // console.log("post send friend request route");
    const requestedUser = req.body.id;
    const loggedInUser = req.session.userId;

    if (req.params.status == "send") {
        db.createFriendship(requestedUser, loggedInUser)
            .then(({ rows }) => {
                // console.log("rows in createfriendship", rows);
                res.json({ rows: rows, button: "cancel" });
            })
            .catch((err) => {
                console.log("error in createFriendship", err);
                res.json({ success: false });
            });
    } else if (req.params.status == "accept") {
        db.acceptFriendship(requestedUser, loggedInUser)
            .then(({ rows }) => {
                // console.log("rows in acceptFriendship", rows);
                res.json({ rows: rows, button: "end" });
            })
            .catch((err) => {
                console.log("error in accept friendship", err);
            });
    } else if (req.params.status == "end" || req.params.status == "cancel") {
        db.unfriend(requestedUser, loggedInUser)
            .then(({ rows }) => {
                // console.log("delete friendship");
                // console.log("rows in unfriend", rows);
                res.json({ rows: rows, button: "send" });
            })
            .catch((err) => {
                console.log("error in unfriend", err);
            });
    }
});

app.post("/delete-account", async (req, res) => {
    // console.log("account deleted");
    const userId = req.session.userId;
    // const filename = req.body.url.replace(s3Url, "");

    try {
        // const img = await db.getProfile(userId);
        // s3.deleteImage(img.image);
        db.deleteCodes(userId);
        db.deleteChats(userId);
        db.deleteFriendships(userId);
        await db.deleteUser(userId);
        res.redirect("/logout");
    } catch (err) {
        console.log("err in delete account: ", err);
        res.json({ success: false });
    }
});

app.get("/404", (req, res) => {
    console.log("i am 404");
    res.json({ notFound: true });
});

/// NEVER MOVE THIS !!!!!!!!!!!!
app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

io.on("connection", async (socket) => {
    // console.log("socket", socket);
    const { userId } = socket.request.session;
    // const { chat } = req.body;
    // console.log("userId connection socket: ", userId);
    if (!userId) {
        return socket.disconnect(true);
    }

    socket.on("chatMessage", async (text) => {
        try {
            // console.log("text chatMessage", text);
            await db.addMessage(userId, text);
            const newMessage = await db.showNewMessages();
            // console.log("rows in show last message: ", rows[0]);
            io.emit("newMessage", newMessage.rows[0]);
        } catch (err) {
            console.log(err, "error in chatMessage");
        }
    });

    try {
        const messages = await db.showMessages();
        // console.log("messages: ", messages);
        io.emit("chatMessages", messages.rows.reverse());
    } catch (err) {
        console.log(err, "error in chatMessage");
    }
});

// socket.on("chatMessage", (text) => {
//     db.addMessage(userId, text)
//         .then(() => {
//             db.showLastMessage().then(({ rows }) => {
//                 console.log("rows in show last message: ", rows[0]);
//                 io.emit("newMessage", rows[0]);
//             });
//         })
//         .catch((err) => {
//             console.log("there was an error in addMessage: ", err);
//         });
// });

// io.on("connection", (socket) => {
//     // console.log("socket", socket);
//     // listening to an event called connection
//     // socket object that is passed to the callback represents the network connection b/w client and server
//     console.log(`Socket with id: ${socket.id} has connected`);

//     // sends message to its own socket
//     socket.emit("hello", {
//         cohort: "adobo",
//     });

//     // send a message to all sockets except your own
//     socket.broadcast.emit("hello", {
//         cohort: "adobo",
//     });

//     // sends message to a SPECIFIC socket
//     io.sockets.sockets.get(socket.id).emit("hello", {
//         cohort: "adobo",
//     });

//     // server to talk to ALL connected sockets
//     io.emit("hello", {
//         cohort: "adobo",
//     });

//     // send a message to ALL EXCEPT one
//     io.socket.socket.get(socket.id).broadcast.emit("hello", {
//         cohort: "adobo",
//     });

//     socket.on("disconnect", () => {
//         console.log(`Socket with id: ${socket.id} just DISCONNECTED`);
//     });
// });
