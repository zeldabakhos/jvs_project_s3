const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: Buffer,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },

    inventory: {
        type: Array,
        required: false
    }
},
{timestamps: true}
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("userSchema", userSchema)