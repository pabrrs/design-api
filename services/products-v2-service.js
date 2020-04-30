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
      throw new /** adicionar classe de erro com status code */
    }

    const product = await Products.update(/** atualizar model */)

    return productsV1Service.serialize(/** retornar produto serializado */)
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

    /** disparar erro caso o produto não exista */
    /** disparar erro caso o campo name seja string vazia */

    product.name = data.name

    if (data.price) {
        /** atualizar price caso seja passado */
    }

    if (data.category_id) {
        /** atualizar category_id caso seja passado */
    }

    /** salvar produto atualizado */

    return productsV1Service.serialize(/** retornar produto serializado */)
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
