const productsV2Service = require('../services/products-v2-service')

module.exports = {
  async create(req, res) {
    try {
      const { name, price, category_id } = req.body
      const product = await productsV2Service.create({ name, price, category_id })
      return res.status(201).json(product)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, price, category_id } = req.body
      const product = await productsV2Service.update(id, { name, price, category_id })
      return res.status(200).json(product)
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
