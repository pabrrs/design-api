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
      const { limit, offset, sort, order } = query
      const { name, name__contains } = query
      const categories = await categoriesService.list({ name, name__contains }, { limit, offset, sort, order })
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body
      const category = await categoriesService.create({ name })
      return res.status(201).json(category)
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
      const { name } = req.body
      const category = await categoriesService.update(id, { name })
      return res.status(200).json(category)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      await categoriesService.delete(id)
      return res.sendStatus(204)
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        error: err.name,
        message: err.message
      })
    }
  }
}
