const productsV1Service = require('../services/products-v1-service')

module.exports = {
  async list(req, res) {
    try {
      /** buscar dados de ordenção */
      /** buscar dados de paginação */
      /** buscar dados de filtros */
      const products = await productsV1Service.list(/** passar dados ao service */)
      /** atribuir o array de produtos na response  */
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async getById(req, res) {
    try {
      /** buscar o id da request */
      const product = await productsV1Service.getById(/** passar o id */)
      /** atribuir o produto buscado na response */
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  }
}
