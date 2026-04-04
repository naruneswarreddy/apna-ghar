const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async(req,res) =>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull :{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}

module.exports.index = async (req,res) => {
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
        throw new ExpressError(400, "Invalid page number. Please select a valid page.");
    }
    let limit = 9;
    let skip = (page - 1) * limit;
    const listing = await Listing.findById(req.params.id).populate({
        path: "reviews", 
        options : { sort : {createdAt : -1}},
        populate: {
            path: "author",
        }
    });
    const totalPages = Math.ceil(listing.reviews.length/ limit);
    if (page > totalPages) {
        throw new ExpressError(400, `The requested page does not exist. Only ${totalPages} page(s) of reviews are available.`);
    }
    let paginatedReviews = listing.reviews.slice(skip, skip+limit)
    res.render("reviews/index.ejs", { listing :listing, reviews : paginatedReviews, totalPages : totalPages, page : page});
}