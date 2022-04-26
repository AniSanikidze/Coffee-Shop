const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc POST response - Registering a user
//@route POST localhost:8080/api/register
const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    const {password,... others} = user._doc
    try{
        user.save()
        res.status(201).json({
            success: true,
            ...others,
            token: generateToken(user.id_,user.role)
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

//@desc POST response - Logging in a user
//@route POST localhost:8080/api/login
const logIn = async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (user == null){
        return res.status(404).json({message: "User was not found"})
    }

    try{
        const {password,... others} = user._doc
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(201).json({
            success: true,
            ...others,
            token: generateToken(user.id,user.role)})
        }
        else{
            res.status(404).json({
                success:false,
                message: "Wrong credentials"
            })
        }  
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const generateToken = (id,role) => {
    const accessToken = jwt.sign({
        id: id,
        role: role
    }, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE_TIME})
    return accessToken
}

module.exports = {registerUser, logIn}