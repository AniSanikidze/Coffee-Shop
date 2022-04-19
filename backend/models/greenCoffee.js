const mongoose = require('mongoose')

const greenCoffeeSchema = new mongoose.Schema({
    productName: {type:String, required: true, unique: true},
    origin: {type:String, required: true},
    desc: {type:String, required: true, unique: true},
    imgs: [{
        url: {type:String}
    }],
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
            quantity: {type:Number,default:0},
            price: {type:Number}
        }
    ]
},
    {timestamps: true}
)

module.exports = mongoose.model("GreenCoffee", greenCoffeeSchema)