const User = require('../models/user')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    const query = req.query.new
    const users = query ? await User.find().sort({_id: -1}).limit(1) : await User.find()
    const usersArray = []
    users.forEach((user) => {
      const {password, ...others} = user._doc
      usersArray.push(others)
    })
    res.status(200).json({
        success:true,
        users: usersArray})
}

const getUser = async (req, res) => {
  retrievedUser = res.foundItem
  res.status(200).json({
    success:true,
    user: retrievedUser
  })
}

const updateUserDetails = async (req, res) => {
  try{
      retrievedUser = req.user
      const updatedUser = await retrievedUser.updateOne(req.body,
      {new: true,
      runValidators: true,
      useFindAndModify:false})
      res.status(201).json({
          success: true,
          updatedUser})
  }
  catch (err) {
    console.log(err)
    if(err._message == 'Validation failed') {
      // if (err.path == 'username'){
      //   res.status(400).json({message: "Username validation failed. "})
      // }
        return res.status(400).json({message: "Email validation failed"})
    }
    if(err.code === 11000) {
      return res.status(400).json({message: `The specified email already exists`})
    }
      res.status(500).json({message: err.message})
  }
}

const updateUserPassword = async (req, res) => {
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    const confirmPassword = req.body.confirmPassword

    if(newPassword !== confirmPassword) {
      return res.status(400).json({message: "Passwords do not match"})
    }
    try {
      if (await bcrypt.compare(oldPassword, req.user.password)){
        const salt = await bcrypt.genSalt()
        hashedPassword = await bcrypt.hash(newPassword, salt)
        const user = req.user
        const {password, ...others} = user._doc
        user.password = hashedPassword
        await user.save()
        res.status(201).json({
            success: true,
            others})
      }
      else{
        return res.status(404).json({message: "Incorrect Password"})
      }
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const updateUserRole = async(req, res) => {
  retrievedUser = res.foundItem
  let username
  let role
  let email
  // const role = req.body.role
  // if (!role) {
  //   res.status(400).json({message: "Role was not provided in the request body"})
  // }
  if (retrievedUser.username !== req.body.username) {
    username = req.body.username
  }
  if (retrievedUser.email !== req.body.email){
    email = req.body.email
  }
  if (retrievedUser.role !== req.body.role){
    role = req.body.role
  }
  try{
    const updatedUser = await retrievedUser.updateOne({username,role,email},
    {new: true,
    runValidators: true,
    useFindAndModify:false})
    console.log(updatedUser)
    res.status(201).json({
        success: true,
        user: updatedUser})
  } catch (err) {
      res.status(500).json({message: err.message})
  }
}

const deleteUserByAdmin = async (req, res) => {
  const retrievedUser = res.foundItem
  try{
    await retrievedUser.remove()
    res.status(200).json({
        success: true,
        message: "User was deleted"})
  }
  catch (err) {
      res.status(500).json({message: err.message})
  }
}

const deleteUser = async (req, res) => {
  try{
      const retrievedUser = req.user
      await retrievedUser.remove()
      res.status(200).cookie("token", null, {expires: new Date(
        Date.now()
      ),
      httpOnly: true}).json({
          success: true,
          message: "User has been deleted"})
  }
  catch (err) {
      res.status(500).json({message: err.message})
  }
}

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
}

const getProfileDetails = async(req, res) => {
  try {
    const user = req.user
    const {password,... others} = user._doc
    res.status(200).json({
        success:true,
        user: others
      })
    } catch (err) {
      res.status(500).json({message: err.message})
    }
}

module.exports = {
    getAllUsers,
    getUser,
    updateUserPassword,
    updateUserDetails,
    deleteUser,
    getUserStats,
    getProfileDetails,
    updateUserRole,
    deleteUserByAdmin
}