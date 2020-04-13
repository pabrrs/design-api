const { Model, Sequelize } = require('sequelize')
const mysql = require('../clients/mysql')
const Categories = require('./Categories')

class Products extends Model {}

Products.init(
  {
    name: Sequelize.STRING,
    price: {
      type: Sequelize.DECIMAL(10, 2),
      default: 0
    },
    expiration_date: Sequelize.DATE
  },
  {
    tableName: 'products',
    sequelize: mysql.getConnection(),
    timestamps: false
  }
)

Products.belongsTo(Categories, { as: 'category', foreignKey: 'category_id' })

module.exports = Products
