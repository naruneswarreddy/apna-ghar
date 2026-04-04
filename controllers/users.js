const User = require("../models/user.js");  
const ExpressError = require("../utils/ExpressError.js");

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.signup = async (req,res)=>{
    try {
        let { username, email, password, fullname} = req.body.user;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.googleId && !existingUser.hash) {
                req.login(existingUser, (err) => {
                    if (err) return next(err);
                    req.flash("success", `Welcome back, ${existingUser.fullname}! Logged in successfully.`);
                    return res.redirect('/listings');
                });
                return;
            }
            req.flash("error", "Account already exists. Please login.");
            return res.redirect("/login");
        }
        req.body.user.avatar = "/images/default-user.png";
        const newUser = new User(req.body.user);
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", `Welcome to Syllabite, ${req.user.username}! Your account has been created successfully.`);
            return res.redirect('/listings');
        });

    } catch (err) {
        req.flash("error", err.message || "Unable to create your account. Please try again.");
        return res.redirect("/signup");
    }
}

module.exports.login = async (req,res)=>{
    req.flash("success", `Welcome back, ${req.user.username}! You have successfully logged in.`);
    let redirectUrl = res.locals.redirectUrl || "/listings"; // use saved URL or default
    res.redirect(redirectUrl); // redirect to the saved URL or default
}

module.exports.logout = (req,res)=>{
   req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You have been logged out successfully. See you again soon!");
        res.redirect('/listings');
    })
}

module.exports.googleCallback = (req, res) => {
    req.flash("success", `Welcome back, ${req.user.fullname || "User"}! You have successfully logged in.`);
    res.redirect("/listings");
}