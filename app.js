if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path =require("path");

// Routes Section
const users = require("./routes/user.js");
const reviews = require("./routes/review.js");
const listings = require("./routes/listing.js");

app.use(express.urlencoded({extended:true}));

const ejsMate = require("ejs-mate");

//Cloud Section
const { storage } = require("./cloudConfig.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');

const User = require("./models/user.js");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const flash = require('connect-flash');

// Error Handling Section
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

// View Engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"VIEWS"));
app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"/public")));

const sessionConfig = require("./config/session");
const passportConfig = require("./config/passport");

app.use(sessionConfig(process.env.ATLASDB_URL));
app.use(flash());

const passport = passportConfig();
app.use(passport.initialize());
app.use(passport.session());

// Locals Section
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user|| req.session.user  || null ; // Set the current user from session or passport
    next();
})

// Routes Section
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);
app.use("/",users);

app.get('/', (req, res) => {
  res.redirect('/listings');
});

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("errors/error.ejs", { err });
});

module.exports = app;
