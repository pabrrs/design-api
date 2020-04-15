const { Op } = require('sequelize')

/**
 * Converte filtros da queryString para sequelize
 * @param { Object } filters
 * @returns { Object }
 */
module.exports = filters => {
  const fields = Object.keys(filters)
  return fields.reduce((acc, field) => {
    const value = filters[field.toString()]

    // Caso o campo exista porém sem valor, ignora
    if (!value) return acc

    if (field.includes('__contains')) {
      const fieldName = field.replace('__contains', '')
      return Object.assign(acc, { [fieldName]: { [Op.like]: `%${value}%` } })
    }
    if (field.includes('__gte')) {
      const fieldName = field.replace('__gte', '')
      return Object.assign(acc, { [fieldName]: { [Op.gte]: value } })
    }
    if (field.includes('__lte')) {
      const fieldName = field.replace('__lte', '')
      return Object.assign(acc, { [fieldName]: { [Op.lte]: value } })
    }
    return Object.assign(acc, { [field]: value })
  }, {})
}
