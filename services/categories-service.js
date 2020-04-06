const Categories = require('../models/Categories')
const NotFound = require('../errors/not-found')

/**
 * @typedef { Object } Category
 * @property { Number } id
 * @property { String } name
 */

module.exports = {
  /**
   * Extrai dados do modelo de categoria
   * @param { Object } data
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
    return []
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
