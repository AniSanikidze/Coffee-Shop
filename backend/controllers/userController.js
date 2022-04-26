const User = require('../models/user')
const bcrypt = require('bcrypt')

//@desc GET response - Getting all users
//@route GET localhost:8080/api/users
const getAllUsers = async (req, res) => {
    const query = req.query.new
    const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find()
    res.status(200).json({
        success:true,
        users})
}

//@desc GET response - Getting specific user by id
//@route GET localhost:8080/api/users/:id
const getUser = async (req, res) => {
    const id = req.params.id
    const specificUser = await User.findById(id)
    res.status(200).json({
        success:true,
        specificUser})
}

//@desc PUT response - Updating a user
//@route PUT localhost:8080/api/users/:id
const updateUser = async (req, res) => {
    const id = req.params.id

    if (req.body.password) {
        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(id,req.body,
        {new: true,
        runValidators: true,
        useFindAndModify:false})
        res.status(201).json({
            success: true,
            updatedUser})
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

//@desc DELETE response - Deleting a specific user by id
//@route DELETE localhost:8080/api/users/:id
const deleteUser = async (req, res) => {
    const id = req.params.id

    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "User has been deleted"})
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}