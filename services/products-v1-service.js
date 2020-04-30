const Products = require('../models/products')

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
  _serialize(data) {
    return { id: data.id, name: data.name, price: data.price, category_id: data.category_id }
  },

  /**
   * Busca todas os produtos
   * @returns {Promise<Array<Product>>}
   */
  async list() {
    /** implementar ordenação */
    /** implementar paginação */
    /** implementar filtros */
    return Products.findAll()
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
