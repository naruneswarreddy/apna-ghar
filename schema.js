const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        category: Joi.string().valid(
            "village","farm","nature","mountains","lakes","camping","heritage","budget","eco","offbeat","orchards","cities","riverside","adventure","farmToTable","animalFarms","community","festivals"
        ).required(),
        availability: Joi.string().valid("available", "rented").required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),

    }).required(),
})

module.exports.userSchema = Joi.object({
    user : Joi.object({
        username: Joi.string().trim().required(), 
        email: Joi.string().email().required(),
        fullname: Joi.string().trim().required(),
        password: Joi.string().min(6).required()
    }).required()
})