const coffee = require('../models/coffee')
const ApiFeatures = require('../utils/apiFeatures')

const getCoffeeProducts = async (req, res) => {
    try{
        const apiFeatures = new ApiFeatures(coffee.find(),req.query).search().filter()
        const products = await apiFeatures.query
        res.status(200).json({
            success:true,
            products})
    }
    catch (err){
        res.status(500).json({message: err.message})
    }
}

const getCoffeeProduct = async (req, res) => {
    retrievedcoffee = res.foundItem
    res.status(200).json({
        success:true,
        retrievedcoffee})
}


const createCoffeeProduct = async (req, res) => {

    try{
        const newcoffee = new coffee(req.body)
        await newcoffee.save()
        res.status(201).json({
            success: true,
            product: newcoffee
        })
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

const updateCoffeeProduct = async (req, res) => {
    try{
        const updatedcoffee = await res.foundItem.updateOne(req.body, 
            {
                new: true,
                runValidators: true,
                useFindAndModify:false
            })
        res.status(201).json({success: true,updatedcoffee})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deleteCoffeeProduct = async (req, res) => {
    try{
        await res.foundItem.remove()
        res.status(200).json({
            success: true,
            message: "Product was deleted"})
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

const createCoffeeReview = async (req, res) => {
    const {
        rating,
        comment,
        coffeeId} = req.body

    const review = {
        user: req.user.id,
        username: req.user.username,
        rating: rating,
        comment: comment
    }

    try {
        const coffeeProduct = await coffee.findById(coffeeId)
        coffeeProduct.reviews.push(review)
        coffeeProduct.numOfReviews = coffeeProduct.reviews.length
        
        let sumOfRatings = 0

        coffeeProduct.reviews.forEach((review) => {
            sumOfRatings += review.rating
        })
        
        const averageRating = sumOfRatings/coffeeProduct.numOfReviews

        coffeeProduct.rating = averageRating
        
        await coffeeProduct.save()

        return res.status(201).json({
            success: true,
            message: "Review was successfully added"
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
}

const getCoffeeReviews = async (req, res) => {
    try{
        const coffeeProduct = res.foundItem
        res.status(200).json({
            success: true,
            reviews: coffeeProduct.reviews
        })
    } catch (err) {
        res.status(500).json(err.message)
    }
    
}

const deleteCoffeeReview = async (req,res) => {
    try {
        const retrievedcoffee = res.foundItem
        const reviewID = req.query.reviewID

        await retrievedcoffee.updateOne({$pull: {reviews: {_id: reviewID}}})
        retrievedcoffee.numOfReviews -= 1
        await retrievedcoffee.save()
        let sumOfRatings = 0
        retrievedcoffee.reviews.forEach((review) => {
            sumOfRatings += review.rating
        })
        retrievedcoffee.rating = sumOfRatings/retrievedcoffee.numOfReviews
        await retrievedcoffee.save()
        res.status(200).json({success: true})
    } catch (err) {
        res.status(500).json(err.message)
    }
}

module.exports = {
    createCoffeeProduct,
    getCoffeeProducts,
    getCoffeeProduct,
    updateCoffeeProduct,
    deleteCoffeeProduct,
    createCoffeeReview,
    getCoffeeReviews,
    deleteCoffeeReview
}