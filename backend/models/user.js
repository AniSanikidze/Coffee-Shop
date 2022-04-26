const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        maxlength:30, 
        minLength: [4, "Name should have more than 4 characters"]},
    email: {type:String, required: true, unique: true, validate: validator.isEmail},
    password: {type:String, required: true, minlength:6},
    role: {
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema)