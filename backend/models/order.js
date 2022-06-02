const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - price
 *         - address
 *         - city
 *         - phoneNumber
 * 
 *       properties:
 *         userId:
 *           type: string
 *           description: The id of the user who ordered product
 *         productName:
 *           type: string
 *           description: The coffee name
 *         products:
 *           type: array
 *           description: array of products
 *           properties:
 *             productId:
 *              type: string
 *              description: The id of the ordered product
 *             price:
 *              type: number
 *              description: Price of the product
 *             quantity:
 *              type: number
 *              description: Quantity of the ordered product
 *         amount:
 *           type: number
 *           description: Total amount of order
 *         shippingAddress:
 *           type: object
 *           description: Shipping address details
 *           properties:
 *             address:
 *              type: string
 *              description: Shipping address
 *             city:
 *              type: string
 *              description: Shipping city
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         status:
 *           type: number
 *           description: Status of the order(pendning, shipped, done)
 *           default: pending
 *       example:
 *           userId: 626a77962d673d7cfafc2212
 *           products: [{productId: 626d55d45ee64b432c344e22, quantity: 5, price: 20}]
 *           phoneNumber: +995577051421
 *           amount: 100
 *           price: 50
 *           shippingAddress: {address: Gamrekeli, city: Tbilisi}
 *           category: roasted
 *           roastLevel: medium
 *           bitterness: 2
 */

 /**
  * @swagger
  * tags:
  *   name: Order
  */

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: [true, "Please enter userID"],
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "Please enter productId"]
            },
            productName: {
                type: String,
                required : [true, "Please enter product name"]
            },
            img : {type: String},
            price: {
                type: Number,
                required: [true, "Please enter product price"]
            },
            quantity: {
                type: Number,
                default: 1,
                required: [true, "Please enter product quantity"]
            },
            coffeeType: {
                type: String,
                required: [true, "Please enter coffee type"]
            }
        }
    ],
    subTotal: {
        type: Number,
        required: true
    },
    shippingPrice:{
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    shippingAddress: {
        address: {
            type: String,
            required: [true, "Please enter shipping address"]
        },
        city: {
            type: String,
            required: [true, "Please enter shipping city"]
        },
        zipCode: {
            type: String,
            required: [true, "Please enter zip code"]
        }
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter phone number"]
    }, 
    status: {
        type: String,
        default: "pending"
    },
	paymentInfo: {
	    id: {
	      type: String,
	      required: true,
	    },
	    status: {
	      type: String,
	      required: true,
	    },
	},
},
    {timestamps: true}
)

module.exports = mongoose.model("order", orderSchema)