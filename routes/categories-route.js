const router = require('express').Router()
const categoriesController = require('../controllers/categories-controller')

router.get('/categories', categoriesController.list)
router.get('/categories/:id', categoriesController.getById)
router.post('/categories', categoriesController.create)
router.put('/categories/:id', categoriesController.update)
router.delete('/categories', categoriesController.delete)

module.exports = router
