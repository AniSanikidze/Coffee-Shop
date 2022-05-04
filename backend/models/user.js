const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user account
 *         role:
 *           type: string
 *           description: Role of the user(admin or user)
 *         resetPasswordToken:
 *           type: string
 *           description: Password reset token
 *       example:
 *           username: test
 *           email: test@gmail.com
 *           password: testpassword123
 */

 /**
  * @swagger
  * tags:
  *   name: User
  */

/**
  * @swagger
  * tags:
  *   name: User Profile
  */

  /**
  * @swagger
  * tags:
  *   name: Admin
  */

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        maxlength: [30, "Name should contain maxiumum of 30 characters"], 
        minLength: [4, "Name should contain at least 4 characters"]
    },
    email: {
        type:String,
        required: [true,"Please enter email"],
        unique: true,
        validate: validator.isEmail},
    password: {
        type:String,
        required: true,
        minlength: [6, "Password should be at least 6 characters long"],
    },
    role: {
        type:String,
        default:"user"
    },
    resetPasswordToken: String
},
    {timestamps: true}
)

module.exports = mongoose.model("User", userSchema)