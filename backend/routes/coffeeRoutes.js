const express = require('express')
const router = express.Router()
const {createCoffeeProduct,getCoffeeProducts,
       getCoffeeProduct,updateCoffeeProduct,
       deleteCoffeeProduct,createCoffeeReview,
       getCoffeeReviews,deleteCoffeeReview} = require('../controllers/coffeeControllers')
const { isAuthenticatedAdmin, verifyToken } = require('../middleware/authMiddleware')
const findMiddleware = require('../middleware/findMiddleware')
const coffee = require('../models/coffee')

/**
 * @swagger
 * /api/coffee/new:
 *   post:
 *     summary: Creates a new coffee product - Admin accessibility only
 *     tags: [Coffee]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Coffee'
 *     responses:
 *       201:
 *         description: The coffee was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coffee'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Forbidden action
 */
router.post('/coffee/new', isAuthenticatedAdmin, createCoffeeProduct)

/**
 * @swagger
 * /api/coffee:
 *   get:
 *     summary: Returns the list of all the coffee products
 *     tags: [Coffee]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: false
 *         description: keyword to search a coffee product
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: Category of the coffee for filtration (green or roasted)
 *       - in: query
 *         name: price[gte]
 *         schema:
 *           type: number
 *         required: false
 *         description: Price(greater than or equal) filtration for coffee
 *       - in: query
 *         name: price[lte]
 *         schema:
 *           type: number
 *         required: false
 *         description: Price(less than or equal) filtration for coffee
 *       - in: query
 *         name: roastLevel
 *         schema:
 *           type: string
 *         required: false
 *         description: Roast level filtration for coffee (ligh, medium or dark)
 *       - in: query
 *         name: singleOrigin
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filteration for blended and single origin coffees
 *       - in: query
 *         name: bitterness
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filtration for bitterness level
 *       - in: query
 *         name: origin
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtration for single origin coffee based on origin
 *       - in: query
 *         name: new
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Sorts coffee products and retrieves newest added ones
 *     responses:
 *       200:
 *         description: The list of the coffee products
 *         content:
 *           application/json:
 *             schema: 
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coffee'
 *       500:
 *         description: Internal Server Error
 */
router.get('/coffee', getCoffeeProducts)

/**
 * @swagger
 * /api/coffee/{id}:
 *   get:
 *     summary: Returns specific coffee
 *     tags: [Coffee]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: coffeeId
 *     responses:
 *       200:
 *         description: Successfuly retrived specific coffee product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.route('/coffee/:id').get(findMiddleware(coffee),getCoffeeProduct)

/**
 * @swagger
 * /api/coffee/{id}:
 *  put:
 *    summary: Updates specific coffee product - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: coffeeID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 role:
 *                  type: string
 *                  example: admin
 *    responses:
 *      201:
 *        description: Successfully updated coffee product
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Product not found
 *      500:
 *        description: Internal Server Error
 */
.put(isAuthenticatedAdmin,findMiddleware(coffee),updateCoffeeProduct)

/**
 * @swagger
 * /api/coffee/{id}:
 *  delete:
 *    summary: Deletes specific coffee product - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: coffeeID
 *    responses:
 *      200:
 *        description: Successfully deleted coffee product
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Product not found
 *      500:
 *        description: Internal Server Error
 */
.delete(isAuthenticatedAdmin,findMiddleware(coffee),deleteCoffeeProduct)

/**
 * @swagger
 * /api/coffee/add-review:
 *   post:
 *     summary: Creates review for a specific coffee product
 *     tags: [Coffee]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       type: object
 *                       properties:
 *                          rating:
 *                           type: number
 *                           example: 5
 *                          comment:
 *                           type: string
 *                           example: The coffee was good
 *                          coffeeId: 
 *                           type: string
 *                           example: 626d57085ee64b432c344e24
 *     responses:
 *       201:
 *         description: The coffee was successfully created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/coffee/add-review', verifyToken, createCoffeeReview)

/**
 * @swagger
 * /api/coffee/reviews/{id}:
 *   get:
 *     summary: Returns all reviews of the specific coffee product
 *     tags: [Coffee]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: coffeeId
 *     responses:
 *       200:
 *         description: Successfuly retrived specific coffee product reviews
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/coffee/reviews/:id',verifyToken,findMiddleware(coffee),getCoffeeReviews)


/**
 * @swagger
 * /api/coffee/reviews/{id}:
 *  delete:
 *    summary: Deletes specific coffee product review
 *    tags: [Coffee]
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: coffeeID
 *      - in: query
 *        name: reviewID
 *        schema:
 *          type: string
 *        required: true
 *        description: reviewID
 *    responses:
 *      200:
 *        description: Successfully deleted coffee product review
 *      401:
 *        description: Not authorized
 *      404:
 *        description: Product not found
 *      500:
 *        description: Internal Server Error
 */
router.delete('/coffee/reviews/:id',verifyToken,findMiddleware(coffee),deleteCoffeeReview)

module.exports = router