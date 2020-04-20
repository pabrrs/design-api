const productsV1Service = require('../services/products-v1-service')

module.exports = {
  async list(req, res) {
    try {
      /** buscar dados de ordenção */
      /** buscar dados de paginação */
      /** buscar dados de fintros */
      const products = await productsV1Service.list(/** passar dados ao service */)
      return res.status(200).json(products)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  }
}
