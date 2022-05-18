const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const {
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getUserOrder,
    getAllOrders, 
    getMonthlyIncome,
    getOrder,
    getMyOrders,
    getMyOrder
} = require('../controllers/orderController')
const { isAuthenticatedAdmin, verifyToken} = require('../middleware/authMiddleware')
const findMiddleware = require('../middleware/findMiddleware')
const order = require('../models/order')
const User = require('../models/user')

/**
 * @swagger
 * /api/order/new:
 *   post:
 *     summary: Creates a new order
 *     tags: [Order]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/Order'
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
router.post('/order/new', verifyToken, createOrder)

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
router.get('/user-order/:userID', isAuthenticatedAdmin, getUserOrder)

/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *    summary: Retrieves specific order - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: orderID
 *    responses:
 *      200:
 *        description: Successfully retrieved specific order
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Orders not found
 *      500:
 *        description: Internal Server Error
 */
router.route('/order/:id').get(isAuthenticatedAdmin,findMiddleware(order), getOrder)

/**
 * @swagger
 * /api/order/{id}:
 *  get:
 *    summary: Retrieves specific order - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: orderID
 *    responses:
 *      200:
 *        description: Successfully retrieved specific order
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Orders not found
 *      500:
 *        description: Internal Server Error
 */
 router.route('/my-orders/:id').get(verifyToken, getMyOrder)

/**
 * @swagger
 * /api/order/{id}:
 *  put:
 *    summary: Updates specific order status - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: orderID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 status:
 *                  type: string
 *                  example: done
 *    responses:
 *      201:
 *        description: Successfully updated order status
 *      401:
 *        description: Not authorized
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: Order not found
 *      500:
 *        description: Internal Server Error
 */
router.put("/order/:id",isAuthenticatedAdmin, findMiddleware(order),updateOrderStatus)

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Deletes specific orders - Admin accessibility only
 *     tags: [Admin]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: orderID
 *     responses:
 *       200:
 *         description: Successfully deleted order
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/order/:id',isAuthenticatedAdmin, findMiddleware(order), deleteOrder)
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Returns the list of all orders - Admin accessibility only
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: The list of all orders
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       500:
 *         description: Internal Server Error
 */
router.get('/orders',isAuthenticatedAdmin, getAllOrders)

/**
 * @swagger
 * /api/income:
 *   get:
 *     summary: Returns income in 2 past months, respectively - Admin accessibility only
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieved income for 2 past months
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       500:
 *         description: Internal Server Error
 */
router.get('/income', isAuthenticatedAdmin, getMonthlyIncome)

/**
 * @swagger
 * /api/user-profile/my-orders:
 *   get:
 *     summary: Returns all orders of logged in user
 *     tags: [User Profile]
 *     responses:
 *       200:
 *         description: Successfully retrieved all orders
 *       401:
 *         description: Not Authorized
 *       404:
 *          description: Orders not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-profile/my-orders', verifyToken, getMyOrders)

module.exports = router