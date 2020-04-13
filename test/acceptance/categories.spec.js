const supertest = require('supertest')
const Categories = require('../../models/categories')
const app = supertest(require('../../app'))

describe('[Acceptance] Categories', () => {
  describe('GET /categories', () => {
    let fixtureIds
    const fixtures = [{ name: 'Informática' }, { name: 'Móveis' }, { name: 'Esportes' }]

    before(async () => {
      const categories = await Categories.bulkCreate(fixtures)
      fixtureIds = categories.map(c => c.id)
    })

    after(async () => {
      await Categories.destroy({ where: { id: fixtureIds } })
    })

    context('without params', () => {
      let res

      before(async () => {
        res = await app.get('/categories')
      })
      it('should return list of categories', async () => {
        const { data } = res.body
        const findCategories = fixtures.every(f => data.some(d => f.name === d.name))
        expect(data.length).to.be.at.least(fixtures.length)
        expect(findCategories).to.be.true
      })
    })

    context('with params', () => {
      context('when filter by "name"', () => {
        let res

        before(async () => {
          res = await app.get('/categories').query({ name: 'Informática' })
        })
        it('should return only "Informática"', async () => {
          expect(res.body.data.length).to.be.at.least(1)
          expect(res.body.data[0]).to.include({
            name: 'Informática'
          })
        })
      })

      context('when filter by "name__contains"', () => {
        let res

        before(async () => {
          res = await app.get('/categories').query({ name__contains: 'sport' })
        })
        it('should return only "Esportes"', async () => {
          expect(res.body.data.length).to.be.at.least(1)
          expect(res.body.data[0]).to.include({
            name: 'Esportes'
          })
        })
      })
    })
  })
  describe('GET /categories/:id', () => {})

  describe('POST /categories', () => {})

  describe('PUT /categories/:id', () => {})

  describe('DELETE /categories/:id', () => {})
})
