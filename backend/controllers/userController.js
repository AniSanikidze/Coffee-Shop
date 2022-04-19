const User = require('../models/user')

//@desc GET response - Getting all users
//@route GET localhost:8080/api/users
const getAllUsers = async (req, res) => {
    const users = await User.find()
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

// //@desc POST response - Registering a user
// //@route POST localhost:8080/register
// const registerUser = (req, res) => {
//     const user = new User(req.body)

//     try{
//         user.save()
//         res.status(201).json({
//             success: true,
//             message: "New user was created"})
//     }
//     catch (err) {
//         console.log(err)
//         res.status(404).json(err)
//     }
// }

//@desc PUT response - Updating a green coffee product
//@route PUT localhost:8080/api/greencoffee/:id
const updateGreenCoffeeProduct = async (req, res) => {
    const id = req.params.id

    try{
        const updatedGreenCoffee = await greenCoffee.findByIdAndUpdate(id,req.body,
        {new: true,
        runValidators: true,
        useFindAndModify:false})
        res.status(201).json({
            success: true,
            updatedGreenCoffee})
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

//@desc DELETE response - Deleting a specific green coffee product by id
//@route DELETE localhost:8080/api/greencoffee/:id
const deleteGreenCoffeeProduct = async (req, res) => {
    const id = req.params.id

    try{
        await greenCoffee.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product was deleted"})
    }
    catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
}

module.exports = {
    getAllUsers,
    getGreenCoffeeProducts,
    getGreenCoffeeProduct,
    updateGreenCoffeeProduct,
    deleteGreenCoffeeProduct
}