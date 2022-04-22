const express = require('express')
const router = express.Router()
const {createGreenCoffeeProduct,
       getGreenCoffeeProducts,
       getGreenCoffeeProduct,
       updateGreenCoffeeProduct,
       deleteGreenCoffeeProduct,
       getGreenCoffeeMiddleware
} = require('../controllers/greenCoffeeControllers')

router.post('/green-coffee/new', createGreenCoffeeProduct)
router.get('/green-coffee', getGreenCoffeeProducts)
router.route('/green-coffee/:id').get(getGreenCoffeeMiddleware,getGreenCoffeeProduct).put(getGreenCoffeeMiddleware,updateGreenCoffeeProduct)
.delete(getGreenCoffeeMiddleware,deleteGreenCoffeeProduct)

module.exports = router