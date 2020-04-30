const productsV2Service = require('../services/products-v2-service')

module.exports = {
  async create(req, res) {
    try {
      /** pegar dados do body da req */
      const product = await productsV2Service.create(/** passar dados para a criação */)
      /** atribuir produto criado a response */
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async update(req, res) {
    try {
      /** buscar id do produto dos parametros da req */
      /** pegar dados do body da req */
      const product = await productsV2Service.update(/** passar dados para atualizar */)
      /** atribuir produto atualizado na response */
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async delete(req, res) {
    try {
      /** buscar id do produto dos parametros da req */
      await productsV2Service.delete(/** passar id do produto para deletar */)
      return res.sendStatus(/** passar satus code indicando a remoção */)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  }
}
