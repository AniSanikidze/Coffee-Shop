const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Coffee:
 *       type: object
 *       required:
 *         - productName
 *         - singleOrigin
 *         - category
 *         - bagSize
 *         - stock
 *         - price
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the coffee
 *         productName:
 *           type: string
 *           description: The coffee name
 *         singleOrigin:
 *           type: boolean
 *           description: True or false, depending if the coffee is blend or not
 *         origin:
 *           type: string
 *           description: Coffee origin
 *         category:
 *           type: string
 *           description: Category of coffee(green or roasted)
 *         desc:
 *           type: string
 *           description: Description of a coffee product
 *         bagSize:
 *           type: number
 *           description: Bag size of the coffee product
 *         stock:
 *           type: number
 *           description: Current stock of the coffee product
 *         price:
 *           type: number
 *           description: Price of the coffee
 *         bitterness:
 *           type: number
 *           description: Biterness level of the coffee (only for roasted coffee)
 *         roastLevel:
 *           type: string
 *           description: Roast level of the coffee product (only for roasted coffee)
 *         imgs:
 *           type: Object.array
 *           description: Array of product image URLs
 *         numOfReviews:
 *           type: number
 *           description: Number of reviews on a coffee product
 *         rating:
 *           type: number
 *           description: Average Rating of the product
 *         reviews:
 *           type: Object.array
 *           description: Array of product reviews
 *       example:
 *           productName: Brazil 250 Blend,
 *           singleOrigin: false,
 *           desc: Brazil Blended is a great coffee,
 *           bagSize: 250,
 *           price: 50,
 *           stock: 200,
 *           category: roasted,
 *           roastLevel: medium,
 *           bitterness: 2
 */

 /**
  * @swagger
  * tags:
  *   name: Coffee
  */

const coffeeSchema = new mongoose.Schema({
    productName: {
        type:String, 
        required: [true, "Please enter coffee name"],
        unique: true
    },
    singleOrigin: {
        type: Boolean,
        default: true,
        required: [true, "Please enter if the coffee has a single origin or not."]
    },
    origin: {
        type:String
    },
    category: {
        type:String,
        required: [true, "Please enter whether the coffee is green or roasted"]
    },
    desc: {
        type:String,
        required: [true, "Please enter coffee description"],
        unique: true
    },
    bagSize: {
        type:Number,
        required: [true, "Please enter bag size"]
    },
    stock: {
        type:Number,
        default:0,
        required: [true, "Please enter coffee stock"]
    },
    price: {
        type:Number,
        required: [true, "Please enter the price of the coffee"]
    },
    bitterness: {type:Number},
    roastLevel: {type:String},
    imgs: [{
        url: {type:String}
    }],
    numOfReviews: {
        type:Number,
        default:0
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
            username: {type:String},
            rating: {type:Number},
            comment: {type:String}
        }
    ]
},
    {timestamps: true}
)

module.exports = mongoose.model("coffee", coffeeSchema)