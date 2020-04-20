const express = require('express')
const categoriesRoute = require('./routes/categories-route')
const productsRoute = require('./routes/products-route')

// Inicializa express
const app = express()

// Habilita transações JSON
app.use(express.json())

// Routes
app.use(categoriesRoute)
app.use(productsRoute)

module.exports = app
