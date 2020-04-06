const { Model, Sequelize } = require('sequelize')
const mysql = require('../clients/mysql')

class Categories extends Model {}

Categories.init(
  {
    name: Sequelize.STRING
  },
  {
    tableName: 'categories',
    sequelize: mysql.getConnection(),
    timestamps: false
  }
)

module.exports = Categories
