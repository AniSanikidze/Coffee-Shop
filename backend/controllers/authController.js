const User = require('../models/user')
const bcrypt = require('bcrypt')

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

    try{
        user.save()
        res.status(201).json({
            success: true,
            message: "New user was created"})
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
            others})
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

module.exports = {registerUser, logIn}