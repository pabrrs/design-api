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
  async list(req, res) {},
  async create(req, res) {},
  async update(req, res) {},
  async delete(req, res) {}
}
