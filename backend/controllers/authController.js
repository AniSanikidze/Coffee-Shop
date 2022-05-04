const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (id,role,expire_time) => {
    const accessToken = jwt.sign({
        id: id,
        role: role
    }, 
    process.env.JWT_SECRET,
    {expiresIn: expire_time ? expire_time : process.env.JWT_EXPIRE_TIME})
    return accessToken
}

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    const {password,... others} = user._doc
    if (!(user.username && user.email && user.password)){
        return res.status(404).json({message: "Username, email and password not provided"})
    }
    try{
        await user.save()
        res.status(201).cookie("token", generateToken(user.id_,user.role),
         {expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
          httpOnly: true}).json({
            success: true,
            ...others,
        })
        await user.save()
    }
    catch (err) {
        if(err.code === 11000) {
            return res.status(400).json({message: `Duplicate email entered`})
        }
        return res.status(500).json({message: err.message})
    }
}


const logIn = async (req, res) => {
    if (!req.body.email || !req.body.password){
        return res.status(400).json({message: 'Please enter email and password'})
    }

    const user = await User.findOne({email: req.body.email})

    if (user == null) {
        return res.status(404).json("User was not found")
    }

    try{
        const {password,... others} = user._doc
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).cookie("token", generateToken(user.id,user.role), {expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
              ),
              httpOnly: true}).json({
                success: true,
                ...others,
            })
        }
        else{
            res.status(404).json({
                success:false,
                message: "Wrong credentials"
            })
        }  
    }
    catch (err) {
        res.status(500).json(err.message)
    }
}

const logOut = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {expires: new Date(
        Date.now()
      ),
      httpOnly: true}).json({
        success: true,
        message: "Logged Out"
    })}
    catch (err) {
        res.status(500).json(err.message)
    }
}

const forgotPassword = async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (user == null){
        return res.status(404).json({message: "User was not found"})
    }  

    const resetToken = jwt.sign({id: user._id}, process.env.JWT_SECRET_PASS_RESET,
                                {expiresIn: process.env.JWT_EXPIRE_TIME_PASS_RESET})
    
    user.resetPasswordToken = resetToken
    
    try{
        await user.save();
        const resetPasswordURL = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`
        const message = `Please click on the given link to reset you password : ${resetPasswordURL} \n\n
         Please, ignore this email if you haven't requested it.` 
        
        await sendEmail({
            email: user.email,
            subject: 'Password Reset - Coffee Berry User Account',
            message
        })

        res.status(200).json({
            success: true,
            message: 'Email sent to a user to reset the password.'
        })
    }
    catch (err){
        user.resetPasswordToken = undefined
        await user.save()
        res.status(500).json({message: err.message})
    }
}

const resetPassword = async (req, res) => {
    const resetToken = req.params.token
    if (!resetToken){
       return res.status(401).json({message: "Authentication error!"})
    }
    jwt.verify(resetToken, process.env.JWT_SECRET_PASS_RESET, (err) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }})

    const user = await User.findOne({resetPasswordToken: resetToken})

    if (!user){
        return res.status(404).json({message: "Invalid password reset token provided"})
    }

    if (req.body.password != req.body.confirmPassword){
        return res.status(400).json({message: "Provided passwords do not match"})
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try{
            user.resetPasswordToken = undefined
            user.password = hashedPassword
            await user.save()
            res.status(200).json({
                success: true,
                message: "The password was successfully updated"
            })
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    registerUser,
    logIn,
    logOut,
    forgotPassword,
    resetPassword
}