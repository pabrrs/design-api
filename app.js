const express = require('express')
const categoriesRoute = require('./routes/categories-route')

// Inicializa express
const app = express()

// Habilita transações JSON
app.use(express.json())

// Routes
app.use(categoriesRoute)

module.exports = app
