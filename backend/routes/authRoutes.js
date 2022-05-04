const express = require('express')
const {registerUser,logIn, logOut,
       forgotPassword,resetPassword} = require('../controllers/authController')
const router = express.Router()

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registers a user
 *     tags: [User]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       400:
 *         description: Duplicate email entered
 *       404:
 *         description: Username, email and password not provided
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [User]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Email and password not entered
 *       404:
 *         description: Wrong credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', logIn)

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: Logs out a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       500:
 *         description: Internal Server Error
 */
router.get('/logout', logOut)

/**
 * @swagger
 * /api/password/forgot:
 *   post:
 *     summary: Sends password reset link to the email of the user
 *     tags: [User]
 *     requestBody: 
 *       required: true,
 *       content:
 *           application/json:
 *                     schema:
 *                       type: object
 *                       properties:
 *                           email:
 *                            type: string
 *                            example: test@gmail.com
 *     responses:
 *       200:
 *         description: The password rest link was sent to the user
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/password/forgot', forgotPassword)

/**
 * @swagger
 * /api/password/reset/{token}:
 *  put:
 *    summary: Updates user's forgotten password
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *        description: The password reset token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 password:
 *                  type: string
 *                  example: newtestpassword123
 *                 confirmPassword:
 *                  type: string
 *                  example: newtestpassword123
 *    responses:
 *      200:
 *        description: The password rest link was sent to the user
 *      400:
 *        description: Password do not match
 *      401:
 *        description: Authentication error
 *      403:
 *        description: Invalid token
 *      404:
 *        description: Invalid password reset token
 *      500:
 *        description: Internal Server Error
 */
router.put('/password/reset/:token', resetPassword)


module.exports = router