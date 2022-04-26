const express = require('express')
const router = express.Router()
const {createGreenCoffeeProduct,
       getGreenCoffeeProducts,
       getGreenCoffeeProduct,
       updateGreenCoffeeProduct,
       deleteGreenCoffeeProduct,
       getGreenCoffeeMiddleware
} = require('../controllers/greenCoffeeControllers')
const { verifyTokenAndAdmin } = require('../middleware/authMiddleware')

router.post('/green-coffee/new', verifyTokenAndAdmin, createGreenCoffeeProduct)
router.get('/green-coffee', getGreenCoffeeProducts)
router.route('/green-coffee/:id').get(getGreenCoffeeMiddleware,getGreenCoffeeProduct).put(verifyTokenAndAdmin,getGreenCoffeeMiddleware,updateGreenCoffeeProduct)
.delete(verifyTokenAndAdmin,getGreenCoffeeMiddleware,deleteGreenCoffeeProduct)

module.exports = router