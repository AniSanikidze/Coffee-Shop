const express = require('express')
const  {getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')
const {verifyTokenAndUserRole,
       verifyTokenAndAdmin} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/users', verifyTokenAndAdmin,getAllUsers)
router.route('/users/:id').get(verifyTokenAndUserRole, getUser)
.put(verifyTokenAndUserRole, updateUser)
.delete(verifyTokenAndUserRole, deleteUser)

module.exports = router

