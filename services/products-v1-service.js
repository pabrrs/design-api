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
  }
}
