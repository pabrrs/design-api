const categoriesService = require('../services/categories-service')

module.exports = {
  async getById(req, res) {
    try {
      const { id } = req.params
      const category = await categoriesService.getById(id)
      return res.status(200).json(category)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async list(req, res) {
    try {
      const { query } = req
      const { limit, offset } = query
      const filters = { ...query }

      delete filters.limit
      delete filters.offset

      const categories = await categoriesService.list({ filters }, { limit, offset })
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },
  async create(req, res) {},
  async update(req, res) {},
  async delete(req, res) {}
}
