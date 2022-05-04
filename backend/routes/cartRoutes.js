const express = require('express')
const router = express.Router()
const {createCart,getUserCart,
       getAllCarts,deleteCart,
       updateCart,getMyCart} = require('../controllers/cartController')
const { isAuthenticatedAdmin, verifyToken } = require('../middleware/authMiddleware')

/**
 * @swagger
 * /api/cart/new:
 *   post:
 *     summary: Creates a new cart
 *     tags: [Cart]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Product was not found
 *       500:
 *          description: Internal Server Error
 */
router.post('/cart/new', verifyToken, createCart)

/**
 * @swagger
 * /api/user-order/{userID}:
 *  get:
 *    summary: Retrieves user's orders - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: userID
 *        schema:
 *          type: string
 *        required: true
 *        description: userID
 *    responses:
 *      200:
 *        description: Successfully retrieved user orders
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Orders not found
 *      500:
 *        description: Internal Server Error
 */
router.get('/user-cart/:userID',isAuthenticatedAdmin, getUserCart)

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Returns the list of all carts - Admin accessibility only
 *     tags: [Admin]
 *     responses:
 *      200:
 *         description: The list of the carts
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Orders not found
 *      500:
 *        description: Internal Server Error
 */
router.get('/carts', isAuthenticatedAdmin, getAllCarts)

/**
 * @swagger
 * /api/my-profile/cart:
 *   get:
 *     summary: Retrieves user's cart
 *     tags: [User Profile]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User cart was not found
 *       500:
 *         description: Internal Server Error
 */
router.route('/my-profile/cart').get(verifyToken, getMyCart)
/**
 * @swagger
 * /api/my-profile/cart:
 *  delete:
 *    summary: Deletes user cart
 *    tags: [User Profile]
 *    responses:
 *      200:
 *        description: Successfully deleted user
 *      401:
 *        description: Not authorized
 *      500:
 *        description: Internal Server Error
 */
.delete(verifyToken, deleteCart)

/**
 * @swagger
 * /api/my-profile/cart:
 *  put:
 *    summary: Updates user cart
 *    tags: [User Profile]
 *    requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Cart'
 *    responses:
 *      201:
 *        description: Successfully updated user cart
 *      401:
 *        description: Not authorized
 *      404:
 *        description: User cart was not found
 *      500:
 *        description: Internal Server Error
 */
.put(verifyToken, updateCart)

module.exports = router