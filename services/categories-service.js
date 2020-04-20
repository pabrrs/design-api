const Categories = require('../models/categories')
const NotFoundError = require('../errors/not-found-error')
const ValidationError = require('../errors/validation-error')
const convertQuery = require('../helpers/convert-query')
const appConfig = require('../config/app-config')

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
   * Monta url para um id de categoria
   * @param { Number } id
   * @return { String }
   */
  getUrl(id) {
    return `${appConfig.url}/categories/${id}`
  },

  /**
   * Busca todas as categorias
   * @returns {Promise<Array<Category>>}
   */
  async list(filters, { limit = 10, offset = 0, sort = 'name', order = 'ASC' }) {
    const query = convertQuery(filters)

    const limitInt = parseInt(limit)
    const offsetInt = parseInt(offset)
    const sortLowerCase = sort.toLowerCase()
    const orderUpperCase = order.toUpperCase()

    if (!['id', 'name'].includes(sortLowerCase)) {
      throw new ValidationError({ message: 'Field sort must be id|name', statusCode: 422 })
    }

    if (!['ASC', 'DESC'].includes(orderUpperCase)) {
      throw new ValidationError({ message: 'Field order must be ASC|DESC', statusCode: 422 })
    }

    const { rows, count } = await Categories.findAndCountAll({
      where: query,
      limit: limitInt,
      offset: offsetInt,
      order: [[sort, orderUpperCase]]
    })

    return {
      _meta: { count, limit: limitInt, offset: offsetInt, sort: sortLowerCase, order: orderUpperCase },
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
