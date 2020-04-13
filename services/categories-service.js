const Categories = require('../models/categories')
const NotFound = require('../errors/not-found')
const convertQuery = require('../helpers/convert-query')

/**
 * @typedef { Object } Category
 * @property { Number } id
 * @property { String } name
 * @property { Array<Object> } products
 */

module.exports = {
  /**
   * Extrai dados do modelo de categoria
   * @param { Object }
   * @returns { Category }
   */
  _serialize(data) {
    return { id: data.id, name: data.name, products: data.products }
  },

  /**
   * Busca todas as categorias
   * @returns {Promise<Array<Category>>}
   */
  async list({ filters }, { limit = 10, offset = 0 }) {
    const query = convertQuery(filters)
    const { rows, count } = await Categories.findAndCountAll({
      where: query,
      limit,
      offset
    })
    return {
      _meta: { count, limit, offset },
      data: rows
    }
  },

  /**
   * Busca categoria por id
   * @param { Number } id
   * @returns { Promise<Category> }
   * @throws { NotFound }
   */
  async getById(id) {
    const category = await Categories.findByPk(id)
    if (!category) {
      throw new NotFound({ message: `Category ${id} not found`, statusCode: 404 })
    }
    return this._serialize(category)
  },

  async create() {
    return null
  },
  async update() {
    return null
  },
  async delete() {
    return null
  }
}
