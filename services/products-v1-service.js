const Products = require('../models/products')
const convertQuery = require('../helpers/convert-query')

const NotFoundError = require('../errors/not-found-error')
const ValidationError = require('../errors/validation-error')

/**
 * @typedef { Object } Product
 * @property { Number } id
 * @property { String } name
 * @property { Number } price
 * @property { Number } category_id
 */

module.exports = {
  /**
   * Extrai dados do modelo de produto
   * @param { Object }
   * @returns { Product }
   */
  serialize(data) {
    return {
      id: data.id,
      name: data.name,
      price: parseFloat(data.price),
      category_id: data.category_id
    }
  },

  /**
   * Busca todas os produtos
   */
  async list(filters, { limit = 10, offset = 0, sort = 'id', order = 'ASC' }) {
    const query = convertQuery(filters)

    const limitInt = parseInt(limit)
    const offsetInt = parseInt(offset)
    const sortLowerCase = sort.toLowerCase()
    const orderUpperCase = order.toUpperCase()

    if (!['id', 'name', 'price'].includes(sortLowerCase)) {
      throw new ValidationError({ message: 'Field sort must be id|name|price', statusCode: 422 })
    }

    if (!['ASC', 'DESC'].includes(orderUpperCase)) {
      throw new ValidationError({ message: 'Field order must be ASC|DESC', statusCode: 422 })
    }

    const { rows, count } = await Products.findAndCountAll({
      where: query,
      limit: limitInt,
      offset: offsetInt,
      order: [[sort, orderUpperCase]]
    })

    const products = rows.map(c => this.serialize(c))

    return {
      _meta: { count, limit: limitInt, offset: offsetInt, sort: sortLowerCase, order: orderUpperCase },
      data: products
    }
  },

  /**
   * Busca Produto por id
   * @param { Number } id
   * @returns { Promise<Product> }
   * @throws { NotFoundError }
   */
  async getById(id) {
    /** buscar produto no modelo com o método Products.findByPk */
    /** disparar erro quando não encontrado */
    /** retornar produto encontrado serializado  */
  }
}
