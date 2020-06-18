const Products = require('../models/products')
const productsV1Service = require('./products-v1-service')
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
   * Cria um produto
   * @param {{ name: String, price: Number, category_id: Number }} data
   * @returns { Promise<Product> }
   * @throws { ValidationError }
   */
  async create({ name, price, category_id }) {
    if (!name || name === '') {
      throw new ValidationError({ message: 'Field name is required', statusCode: 422 })
    }

    if (!price || price === '') {
      throw new ValidationError({ message: 'Field price is required', statusCode: 422 })
    }

    if (!category_id || category_id === '') {
      throw new ValidationError({ message: 'Field category_id is required', statusCode: 422 })
    }

    const product = await Products.create({ name, price, category_id })

    return productsV1Service.serialize(product)
  },

  /**
   * Atualiza um produto
   * @param { Number } id
   * @param { Object } data
   * @returns { Promise<Product> }
   * @throws { NotFoundError }
   * @throws { ValidationError }
   */
  async update(id, data) {
    const product = await Products.findByPk(id)

    if (!product) {
      throw new NotFoundError({ message: `Product ${id} not found`, statusCode: 404 })
    }

    if (data.name === '') {
      throw new ValidationError({ message: 'Field name is required', statusCode: 422 })
    }

    product.name = data.name

    if (data.price) {
      product.price = data.price
    }

    if (data.category_id) {
      product.category_id = data.category_id
    }

    await product.save()

    return productsV1Service.serialize(product)
  },

  /**
   * Remove um produto
   * @param { Number } id
   * @throws { NotFoundError }
   */
  async delete(id) {
    /** busca produto do banco usando Products.findByPk */

    if (!product) {
      throw new NotFoundError(/** retorna mensagem de erro e status code */)
    }

    /** remove produto do banco */
  }
}
