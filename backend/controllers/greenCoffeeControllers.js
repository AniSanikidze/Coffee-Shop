const greenCoffee = require('../models/greenCoffee')

//@desc GET response - Getting all green coffee products
//@route GET localhost:8080/api/greencoffee
const getGreenCoffeeProducts = async (req, res) => {
    try{
        const greenCoffeeProducts = await greenCoffee.find()
        res.status(200).json({
            success:true,
            greenCoffeeProducts})
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

//@desc GET response - Getting specific green coffee by id
//@route GET localhost:8080/api/greencoffee/:id
const getGreenCoffeeProduct = async (req, res) => {
    retrievedGreenCoffee = res.specificGreenCoffee
    res.status(200).json({success:true,
        retrievedGreenCoffee})
}

//@desc POST response - Creating a green coffee product
//@route POST localhost:8080/api/greencoffee/new
const createGreenCoffeeProduct = async (req, res) => {
    try{
        const newGreenCoffee = new greenCoffee(req.body)
        await newGreenCoffee.save()
        res.status(201).json({success: true,
            newGreenCoffee})
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

//@desc PUT response - Updating a green coffee product
//@route PUT localhost:8080/api/greencoffee/:id
const updateGreenCoffeeProduct = async (req, res) => {
    try{
        const updatedGreenCoffee = await res.specificGreenCoffee.updateOne(req.body, 
            {
                new: true,
                runValidators: true,
                useFindAndModify:false
            })
        res.status(201).json({success: true,updatedGreenCoffee})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

//@desc DELETE response - Deleting a specific green coffee product by id
//@route DELETE localhost:8080/api/greencoffee/:id
const deleteGreenCoffeeProduct = async (req, res) => {
    try{
        await res.specificGreenCoffee.remove()
        res.status(200).json({
            success: true,
            message: "Product was deleted"})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getGreenCoffeeMiddleware = async (req, res, next) => {
    let specificGreenCoffee

    try {
        specificGreenCoffee = await greenCoffee.findById(req.params.id)
        res.specificGreenCoffee = specificGreenCoffee
        if (specificGreenCoffee == null) {
            return res.status(404).json({message: "Cannot find the specific green coffee product"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
  
    next()
}

module.exports = {
    createGreenCoffeeProduct,
    getGreenCoffeeProducts,
    getGreenCoffeeProduct,
    updateGreenCoffeeProduct,
    deleteGreenCoffeeProduct,
    getGreenCoffeeMiddleware
}