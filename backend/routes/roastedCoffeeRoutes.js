const express = require('express')
const router = express.Router()
const {createRoastedCoffeeProduct,
       getRoastedCoffeeProducts,
       getRoastedCoffeeProduct,
       updateRoastedCoffeeProduct,
       deleteRoastedCoffeeProduct,
       getRoastedCoffeeMiddleware
} = require('../controllers/roastedCoffeeControllers')

router.post('/roasted-coffee/new', createRoastedCoffeeProduct)
router.get('/roasted-coffee', getRoastedCoffeeProducts)
router.route('/roasted-coffee/:id').get(getRoastedCoffeeMiddleware,getRoastedCoffeeProduct)
.put(getRoastedCoffeeMiddleware,updateRoastedCoffeeProduct).delete(getRoastedCoffeeMiddleware,deleteRoastedCoffeeProduct)

module.exports = router