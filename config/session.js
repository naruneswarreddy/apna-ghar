const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (dbUrl) => {

    const store = MongoStore.create({
        mongoUrl : dbUrl,
        crypto : {
            secret : process.env.SECRET
        },
        touchAfter : 24 * 3600,
    });

    store.on("error", (err) => {
        console.log("ERROR IN MONGO SESSION STORE", err);
    });

    return session({
        store,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
    });
};