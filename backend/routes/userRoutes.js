const express = require('express')
const  {getAllUsers, getUser, deleteUser,
        getUserStats, getProfileDetails,
        updateUserPassword, updateUserDetails,
        deleteUserByAdmin, updateUserRole } = require('../controllers/userController')
const {isAuthenticatedAdmin, verifyToken} = require('../middleware/authMiddleware')
const findMiddleware = require('../middleware/findMiddleware')
const router = express.Router()
const User = require('../models/user')


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the list of all users - Admin accessibility only
 *     tags: [Admin]
 *     parameters:
 *      - in: query
 *        name: new
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Sorts users and retrieves newest registered ones
 *     responses:
 *       200:
 *         description: The list of all users
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       500:
 *         description: Internal Server Error
 */
router.get('/users', isAuthenticatedAdmin, getAllUsers)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Returns the number of users reistered in past 2 months, respectively
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Successfully retrieves past 2 months with respective number of users registered
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       500:
 *         description: Internal Server Error
 */
router.get('/stats', isAuthenticatedAdmin, getUserStats)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Returns specific user based on provided id
 *     tags: [Admin]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: userId
 *     responses:
 *       200:
 *         description: Successfully retrieved a specific user
 *       400:
 *         description: Bad Request, User Not Found
 *       401:
 *         description: Not Authorized
 *       403:
 *         description: Forbidden Action
 *       500:
 *         description: Internal Server Error
 */
router.route('/users/:id').get(isAuthenticatedAdmin,findMiddleware(User),getUser)

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Updates user - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: userID
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
 *        description: Successfully updated user role
 *      400:
 *        description: Bad request - role was not provided in the request body
 *      401:
 *        description: Authentication error
 *      403:
 *        description: Invalid token
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal Server Error
 */
.put(isAuthenticatedAdmin,findMiddleware(User),updateUserRole)

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Deletes specific user - Admin Accessibility only
 *    tags: [Admin]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: userID
 *    responses:
 *      200:
 *        description: Successfully deleted user role
 *      401:
 *        description: Authentication error
 *      403:
 *        description: Forbidden action
 *      404:
 *        description: User not found
 *      500:
 *        description: Internal Server Error
 */
.delete(isAuthenticatedAdmin,findMiddleware(User), deleteUserByAdmin)

/**
 * @swagger
 * /api/my-profile:
 *   get:
 *     summary: Retrieves user profile details
 *     tags: [User Profile]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       401:
 *         description: Not authorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/my-profile',verifyToken,getProfileDetails)

/**
 * @swagger
 * /api/my-profile/update/password:
 *  put:
 *    summary: Updates user password
 *    tags: [User Profile]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 oldPassword:
 *                  type: string
 *                  example: testpassword123
 *                 newPassword:
 *                  type: string
 *                  example: newtestpassword123
 *                 confirmPassword:
 *                  type: string
 *                  example: newtestpassword123
 *    responses:
 *      201:
 *        description: Successfully updated user password
 *      400:
 *        description: Bad request - passwords do not match
 *      401:
 *        description: Not authorized
 *      500:
 *        description: Internal Server Error
 */
router.put('/my-profile/update/password', verifyToken, updateUserPassword)

/**
 * @swagger
 * /api/my-profile/update/user-details:
 *  put:
 *    summary: Updates user details
 *    tags: [User Profile]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                 username:
 *                  type: string
 *                  example: newtestusername
 *                 email:
 *                  type: string
 *                  example: newtestemail
 *    responses:
 *      201:
 *        description: Successfully updated user
 *      401:
 *        description: Not authorized
 *      500:
 *        description: Internal Server Error
 */
router.put('/my-profile/update/user-details',verifyToken, updateUserDetails)

/**
 * @swagger
 * /api/my-profile/delete:
 *  delete:
 *    summary: Deletes user account
 *    tags: [User Profile]
 *    responses:
 *      200:
 *        description: Successfully deleted user
 *      401:
 *        description: Not authorized
 *      500:
 *        description: Internal Server Error
 */
router.delete('/my-profile/delete',verifyToken,deleteUser)

module.exports = router