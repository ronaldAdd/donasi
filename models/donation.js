const mongoose = require('mongoose');
const Joi = require('joi');

const DonationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    approved: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});


    function validator (data) {
        const schemaValidation=Joi.object({
            name : Joi.string().required(),
            email : Joi.string().required(),
            phonenumber : Joi.string().required(),
            price: Joi.number().required()
        })
        const result = schemaValidation.validate(data)
        return result;
    }

    function validatorImage (data) {
        const schemaValidation=Joi.object({
            filename : Joi.string().required()
        })
        const result = schemaValidation.validate(data)
        return result;
    }

module.exports = mongoose.model('donations', DonationSchema);
module.exports.validator = validator;
module.exports.validatorImage = validatorImage;
