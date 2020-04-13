const { Op } = require('sequelize')
const convertQuery = require('../../../helpers/convert-query')

describe('[Unit] helpers/convert-query', () => {
  context('__contains filter', () => {
    it('should use Op.like operator', () => {
      const query = convertQuery({ name__contains: 'foo' })
      expect(query).to.deep.equal({ name: { [Op.like]: '%foo%' } })
    })
  })

  context('__gte filter', () => {
    it('should use Op.gte operator', () => {
      const query = convertQuery({ price__gte: 4 })
      expect(query).to.deep.equal({ price: { [Op.gte]: 4 } })
    })
  })

  context('__lte filter', () => {
    it('should use Op.lte operator', () => {
      const query = convertQuery({ rate__lte: 3 })
      expect(query).to.deep.equal({ rate: { [Op.lte]: 4 } })
    })
  })

  context('no filter given', () => {
    it('should use direct relation without operators', () => {
      const query = convertQuery({ email: 'john@doe.io' })
      expect(query).to.deep.equal({ email: 'john@doe.io' })
    })
  })
})
