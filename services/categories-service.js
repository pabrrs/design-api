const Categories = require('../models/categories')
const NotFoundError = require('../errors/not-found-error.js')
const ValidationError = require('../errors/validation-error')
const convertQuery = require('../helpers/convert-query')

/**
 * @typedef { Object } Category
 * @property { Number } id
 * @property { String } name
 */

module.exports = {
  /**
   * Extrai dados do modelo de categoria
   * @param { Object }
   * @returns { Category }
   */
  _serialize(data) {
    return { id: data.id, name: data.name }
  },

  /**
   * Busca todas as categorias
   * @returns {Promise<Array<Category>>}
   */
  async list(filters, { limit = 10, offset = 0 }) {
    const query = convertQuery(filters)

    const { rows, count } = await Categories.findAndCountAll({
      where: query,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    return {
      _meta: {
        count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      },
      data: rows
    }
  },

  /**
   * Busca categoria por id
   * @param { Number } id
   * @returns { Promise<Category> }
   * @throws { NotFoundError }
   */
  async getById(id) {
    const category = await Categories.findByPk(id)

    if (!category) {
      throw new NotFoundError({ message: `Category ${id} not found`, statusCode: 404 })
    }

    return this._serialize(category)
  },

  /**
   * Cria uma categoria
   * @param {{ name: String }} data
   * @returns { Promise<Category> }
   * @throws { ValidationError }
   */
  async create({ name }) {
    if (!name || name === '') {
      throw new ValidationError({ message: 'Field name is required', statusCode: 422 })
    }

    const category = await Categories.create({ name })
    return this._serialize(category)
  },

  /**
   * Atualiza uma categoria
   * @param { Number } id
   * @param { Object } data
   * @throws { NotFoundError }
   * @throws { ValidationError }
   */
  async update(id, data) {
    const category = await Categories.findByPk(id)

    if (!category) {
      throw new NotFoundError({ message: `Category ${id} not found`, statusCode: 404 })
    }

    if (data.name === '') {
      throw new ValidationError({ message: 'Field name is required', statusCode: 422 })
    }

    category.name = data.name
    await category.save()

    return this._serialize(category)
  },

  /**
   * Remove uma categoria
   * @param { Number } id
   * @throws { NotFoundError }
   */
  async delete(id) {
    const category = await Categories.findByPk(id)

    if (!category) {
      throw new NotFoundError({ message: `Category ${id} not found`, statusCode: 404 })
    }

    await category.destroy()
  }
}
