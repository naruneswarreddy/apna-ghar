const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { userSchema } = require("../schema.js");

const validateSignup = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

const userController = require("../controllers/users.js");
const ExpressError = require("../utils/ExpressError.js");

// SignUp Form Route, SignUp Route
router.route("/signup")
    .get(userController.renderSignup)
    .post(validateSignup,wrapAsync(userController.signup));

// Login Form Route, Login Route
router.route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(userController.login));

// Google Auth Route
router.get("/auth/google",passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get("/auth/google/callback",passport.authenticate("google", {failureRedirect: "/login",failureFlash: true}),userController.googleCallback);

// Logout Route
router.get("/logout",userController.logout);

module.exports = router;