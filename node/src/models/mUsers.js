const mongoose = require('mongoose');

//User Schema
// Users must have a unique email, and minimum 9 char password. Username is optional
const UserSchema = new mongoose.Schema({
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
     }
})

module.exports = mongoose.model("Users", UserSchema);