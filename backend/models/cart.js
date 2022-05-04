const mongoose = require('mongoose')

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 * 
 *       properties:
 *         userId:
 *           type: string
 *           description: The id of the user who added product to the cart
 *         products:
 *           type: array
 *           description: array of products
 *           properties:
 *             productId:
 *              type: string
 *              description: The id of the added product
 *             quantity:
 *              type: number
 *              description: Quantity of the added product
 *       example:
 *           userId: 625de51fa2c126db089b64c2
 *           products: [{productId: 626d57085ee64b432c344e24, quantity: 2}]
 */

 /**
  * @swagger
  * tags:
  *   name: Cart
  */


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", 
        required: [true, "Please enter userID"],
        unique: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: [true, "Please enter productID"],
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
},
    {timestamps: true}
)

module.exports = mongoose.model("Cart", cartSchema)