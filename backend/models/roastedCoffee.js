const mongoose = require('mongoose')

const roastedCoffeeSchema = new mongoose.Schema({
    productName: {type:String, required: true, unique: true},
    origin: {type:String, required: true},
    desc: {type:String, required: true, unique: true},
    bitterness: {type:Number},
    roastLevel: {type:String},
    img: [],
    rating: {type:Number},
    numOfReviews: {type:Number},
    reviews: [
        {
            userID: {type:Number},
            rating: {type:Number},
            comment: {type:String}
        }
    ],
    SKUs: [
        {
            bagSize: {type:Number},
            quantity: {type:Number},
            price: {type:Number}
        }
    ]
},
    {timestamps: true}
)

module.exports = mongoose.model("RoastedCoffee", roastedCoffeeSchema)