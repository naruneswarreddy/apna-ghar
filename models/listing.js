
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description :{
        type: String,
        required : true,
        trim : true
    },
    
    imageUrl : {
        type: String,
        required : true
    },
    imageName : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    availability :{
        type : String,
        enum : ["available", "rented"],
        default: "available"
    },
    category : {
        type : String,
        enum: ["village","farm","nature","mountains","lakes","camping","heritage","budget","eco","offbeat","orchards","cities","riverside","adventure","farmToTable","animalFarms","community","festivals"],
        default : "village",
    },
}, {timestamps: true});

const Listing = mongoose.models.Listing ||mongoose.model("Listing",listingSchema);

module.exports  = Listing ;