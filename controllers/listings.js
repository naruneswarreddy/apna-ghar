const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

const cloudinary = require('cloudinary').v2;
module.exports.index = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    if (page < 1) {
        throw new ExpressError(400, "Invalid page number. Please select a valid page.");
    }
    let limit = 10;
    let skip = (page - 1) * limit;
    let filter = {};
    let { location, category } = req.query;
    if (location) {
        filter.location = { $regex: location, $options: "i" };
    }
    if (category) {
        filter.category = category;
    }
    const totalListings = await Listing.countDocuments(filter);
    const totalPages = Math.ceil(totalListings / limit);
    if (page > totalPages && totalPages != 0) {
        throw new ExpressError(400, `Page ${page} does not exist. Only ${totalPages} page(s) are available.`);
    }
    const allListings = await Listing.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });;
    res.render("listings/index.ejs", { allListings: allListings, page: page, totalPages: totalPages, selectedCategory: category, searchLocation: location });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
        populate: {
            path: "author",
        },
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    let reviewCount = listing.reviews.length;
    let avgRating = 0;
    if (listing.reviews.length > 0) {
        avgRating = (listing.reviews.reduce((acc, curr) => acc + curr.rating, 0) / listing.reviews.length).toFixed(1);
    }
    let limitedReviews = listing.reviews.slice(0, 3);

    res.render("listings/show.ejs", { listing: listing, reviews: limitedReviews, reviewCount: reviewCount, avgRating: avgRating });
}

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // setting the owner of the listing to the current user
    if(req.file){
        newListing.imageUrl = req.file.path;
        newListing.imageName = req.file.filename;
    }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing});
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'The requested listing could not be found.');
        return res.redirect('/listings');
    }
    Object.assign(listing, req.body.listing);
    if (req.file) {
        try {
            if(listing.imageName){
                await cloudinary.uploader.destroy(listing.imageName);
            }
        }catch(e) {
            console.error("Cloudinary delete failed:", e.message);
        }
        listing.imageUrl = req.file.path;
        listing.imageName = req.file.filename;
    }
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash('error', 'The requested listing could not be found.');
        return res.redirect('/clubs');
    }
    await Review.deleteMany({_id: { $in: deletedListing.reviews }});
    if (deletedListing.imageName) {
        try {
            await cloudinary.uploader.destroy(deletedListing.imageName);
        } catch (e) {
            console.error("Cloudinary delete failed:", e.message);
        }
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}
