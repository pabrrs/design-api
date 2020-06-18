const express = require('express')
const swaggerUi = require('swagger-ui-express')
const categoriesRoute = require('./routes/categories-route')
const productsRoute = require('./routes/products-route')
const swaggerConfig = require('./config/swagger.json')

// Inicializa express
const app = express()

// Habilita transações JSON
app.use(express.json())

// Routes
app.use(categoriesRoute)
app.use(productsRoute)

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

module.exports = app
