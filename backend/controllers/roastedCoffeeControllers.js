const roastedCoffee = require('../models/roastedCoffee')

//@desc GET response - Getting all roasted coffee products
//@route GET localhost:8080/api/roastedcoffee
const getRoastedCoffeeProducts = async (req, res) => {
    try{
        const roastedCoffeeProducts = await roastedCoffee.find()
        res.status(200).json({
            success:true,
            roastedCoffeeProducts})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

//@desc GET response - Getting specific roasted coffee by id
//@route GET localhost:8080/api/roastedcoffee/:id
const getRoastedCoffeeProduct = async (req, res) => {
    retrievedRoastedCoffee = res.specificRoastedCoffee
    res.status(200).json({success:true,
        retrievedRoastedCoffee})
}

//@desc POST response - Creating a roasted coffee product
//@route POST localhost:8080/api/roastedcoffee/new
const createRoastedCoffeeProduct = async (req, res) => {
    try{
        const newRoastedCoffee = new roastedCoffee(req.body)
        await newRoastedCoffee.save()
        res.status(201).json({
            success: true,
            newRoastedCoffee})
    }
    catch (err) {
        res.status(404).json(err)
    }
}

//@desc PUT response - Updating a roasted coffee product
//@route PUT localhost:8080/api/roastedcoffee/:id
const updateRoastedCoffeeProduct = async (req, res) => {
    try{
        const updatedRoastedCoffee = await res.specificRoastedCoffee.updateOne(req.body, 
            {
                new: true,
                runValidators: true,
                useFindAndModify:false
            })
        res.status(201).json({success: true,updatedRoastedCoffee})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

//@desc DELETE response - Deleting a specific roasted coffee product by id
//@route DELETE localhost:8080/api/roastedcoffee/:id
const deleteRoastedCoffeeProduct = async (req, res) => {
    try{
        await res.specificRoastedCoffee.remove()
        res.status(200).json({
            success: true,
            message: "Product was deleted"})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getRoastedCoffeeMiddleware = async (req, res, next) => {
    let specificRoastedCoffee

    try {
        specificRoastedCoffee = await roastedCoffee.findById(req.params.id)
        res.specificRoastedCoffee = specificRoastedCoffee
        if (specificRoastedCoffee == null) {
            return res.status(404).json({message: "Cannot find the specific roasted coffee product"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
  
    next()
}

module.exports = {
    createRoastedCoffeeProduct,
    getRoastedCoffeeProducts,
    getRoastedCoffeeProduct,
    updateRoastedCoffeeProduct,
    deleteRoastedCoffeeProduct,
    getRoastedCoffeeMiddleware
}