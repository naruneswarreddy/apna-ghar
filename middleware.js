const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./MODELS/review");
module.exports.isLoggedIn = (req,res,next)=>{
   
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // save the URL to redirect after login      
         req.flash("error","You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // make it available in the response locals
    }
    next();
}

module.exports.isOwner = async (req,res,next) =>{
    let {id}= req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
        if(error){
            let errorMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errorMsg);
        }else{
            next();
        }
}

module.exports.validateReview = (req,res,next) =>{
    let {error} = reviewSchema.validate(req.body);
        if(error){
            let errorMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errorMsg);
        }else{
            next();
        }
}

module.exports.isReviewAuthor = async (req,res,next) =>{
    let {id,reviewId}= req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.checkGoogleUserLogin = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.googleId && !user.hash) {
        req.flash("error", "Please login using Google");
        return res.redirect("/login");
    }
    next();
};
