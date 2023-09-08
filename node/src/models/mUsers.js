const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
    },
    username: {
        type: String,
        default: "user",
    },
    password: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 32
     }
})

module.exports = mongoose.model("Users", userSchema);