const router = require('express').Router()
const productsV1Controller = require('../controllers/products-v1-controller')
const productsV2Controller = require('../controllers/products-v2-controller')
const productsV3Controller = require('../controllers/products-v3-controller')

// /v1/products
router.get('/v1/products', productsV1Controller.list)

// /v2/products
router.post('/v2/products', productsV2Controller.create)
router.put('/v2/products/:id', productsV2Controller.update)
router.delete('/v2/products/:id', productsV2Controller.delete)

// /v3/products

module.exports = router
