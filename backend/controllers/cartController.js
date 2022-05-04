const cart = require('../models/cart')

const getAllCarts = async (req, res) => {
    try{
        const carts = await cart.find()
        res.status(200).json({
            success:true,
            carts})
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

const createCart = async (req, res) => {
    try{
        const cartAlreadyExists = await cart.findOne({userId: req.body.userId})
        if (cartAlreadyExists){
            return res.status(400).json("Cart already exists for provided user")
        }
        const newCart = new cart(req.body)
        
        await newCart.save()
        res.status(201).json({success: true,
            newCart})
    }
    catch (err) {
        return res.status(500).json({message: err.message})
    }
}

const getMyCart = async(req, res) => {
    try {
        const userCart = await cart.findOne({userId: req.user.id})
        if (userCart == null) {
            return res.status(404).json("User cart was not found")
        }
        res.status(200).json({
            success: true,
            userCart})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const updateCart = async (req, res) => {
    try{
        const userCart = await cart.findOne({userId: req.user.id})
        if (userCart == null) {
            return res.status(404).json("User cart not found")
        }
        const updatedCart = await userCart.updateOne(req.body, 
            {
                new: true,
                runValidators: true,
                useFindAndModify:false
            })
        res.status(201).json({success: true,updatedCart})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteCart = async (req, res) => {
    try{
        const userCart = await cart.findOne({userId: req.user.id})
        if (userCart == null) {
            return res.status(404).json("User cart was not found")
        }
        await userCart.remove()
        res.status(200).json({
            success: true,
            message: "Cart was deleted"})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getUserCart = async (req, res) => {
    try {
        const userCart = await cart.findOne({userId: req.params.userID})
        if (userCart == null) {
            res.status(404).json("User cart was not found")
        }
        res.status(200).json({
            success: true,
            userCart})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCarts,
    getUserCart,
    getMyCart
}