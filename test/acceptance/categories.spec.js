const supertest = require('supertest')
const Categories = require('../../models/Categories')
const app = supertest(require('../../app'))

describe('[Acceptance] Categories', () => {
  let res
  describe('GET /categories', () => {
    const fixtures = [
      {
        id: 1,
        nome: 'Informática'
      },
      {
        id: 2,
        nome: 'Móveis'
      }
    ]

    before(async () => {
      await Categories.bulkCreate([fixtures])
    })

    after(async () => {
      const fixtureIds = fixtures.map(f => f.id)
      await Categories.destroy({ where: { id: fixtureIds } })
    })

    context('sem parâmetros', () => {
      before(async () => {
        res = await app.get('/categories')
      })

      it('deve retornar lista de categorias', () => {
        const categories = res.body
        expect(categories).to.be.eql({
          _meta: { count: 2, limit: 10, offset: 1 },
          data: fixtures
        })
      })
    })
  })
  describe('GET /categories/:id', () => {})

  describe('POST /categories', () => {})

  describe('PUT /categories/:id', () => {})

  describe('DELETE /categories/:id', () => {})
})
