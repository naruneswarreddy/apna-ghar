const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");

const userSchema = new Schema({
    email :{
        type :String,
        required :true
    },
    fullname : {
        type:String,
        required : true,
    },
    googleId: String,
    avatar : {
        type : String,
        default : "https://res.cloudinary.com/dmxrppnpy/image/upload/v1774020279/default-user_d9cfvt.png"
    }
});


userSchema.plugin(passportLocalMongoose); // automatically implement username , password etc..
module.exports = mongoose.model("User",userSchema);
