const supertest = require('supertest')
const Categories = require('../../models/categories')
const Products = require('../../models/products')
const appConfig = require('../../config/app-config')
const app = supertest(require('../../app'))

describe('[Acceptance] Products V3', () => {
  let res

  const categoryFixture = { id: 1, name: 'Tecnologia' }
  const productFixture = { id: 1, name: 'Monitor', price: 250.0, category_id: 1 }

  before(async () => {
    await Products.truncate()
    await Categories.truncate()
    await Categories.create(categoryFixture)
    await Products.create(productFixture)
  })

  after(async () => {
    await Products.truncate()
    await Categories.truncate()
  })

  describe('GET /v3/products', () => {
    before(async () => {
      res = await app.get('/v3/products')
    })

    it('should return status 200 (OK)', () => {
      expect(res.status).to.be.eql(200)
    })

    it('should return relations between categories (hateoas)', () => {
      const { data } = res.body
      expect(data[0]).to.be.eql({
        id: productFixture.id,
        name: productFixture.name,
        price: productFixture.price,
        category: {
          id: categoryFixture.id,
          name: categoryFixture.name,
          _link: `${appConfig.url}/categories/${categoryFixture.id}`
        }
      })
    })
  })

  describe('GET /v3/products/:id', () => {
    before(async () => {
      res = await app.get('/v3/products')
    })

    it('should return status 200 (OK)', () => {
      expect(res.status).to.be.eql(200)
    })

    it('should return relations between categories (hateoas)', () => {
      const { data } = res.body
      expect(data).to.be.eql({
        id: productFixture.id,
        name: productFixture.name,
        price: productFixture.price,
        category: {
          id: categoryFixture.id,
          name: categoryFixture.name,
          _link: `${appConfig.url}/categories/${categoryFixture.id}`
        }
      })
    })
  })

  describe('/docs', () => {
    before(async () => {
      res = await app.get('/docs')
    })

    it('should document /v1/products', () => {})
    it('should document /v2/products', () => {})
    it('should document /v3/products', () => {})
  })
})
