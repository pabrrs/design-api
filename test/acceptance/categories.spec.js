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

      it('should return status 200 (OK)', () => {
        expect(res.status).to.be.eql(200)
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

        it('should return status 200 (OK)', () => {
          expect(res.status).to.be.eql(200)
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

        it('should return status 200 (OK)', () => {
          expect(res.status).to.be.eql(200)
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

  describe('GET /categories/:id', () => {
    let fixtureId
    const fixture = { name: 'Alimentação' }

    before(async () => {
      const category = await Categories.create(fixture)
      fixtureId = category.id
    })

    after(async () => {
      await Categories.destroy({ where: { id: fixtureId } })
    })

    context('when category exists', () => {
      let res

      before(async () => {
        res = await app.get(`/categories/${fixtureId}`)
      })

      it('should return status 200 (Ok)', () => {
        expect(res.status).to.be.eql(200)
      })

      it('should return matching category', () => {
        expect(res.body).to.have.property('name', fixture.name)
      })
    })
    context('when category not exists', () => {
      let res

      before(async () => {
        res = await app.get('/categories/99999999')
      })

      it('should return status 404 (Not Found)', () => {
        expect(res.status).to.be.eql(404)
      })

      it('should return error message', () => {
        expect(res.body).to.be.eql({
          error: 'NotFoundError',
          message: 'Category 99999999 not found'
        })
      })
    })
  })

  describe('POST /categories', () => {
    context('when all fields was given', () => {
      let res
      const fixture = { name: 'Tecnologia' }

      before(async () => {
        res = await app.post('/categories').send(fixture)
      })

      after(async () => {
        await Categories.destroy({ where: { id: res.body.id } })
      })

      it('should return 201 (Created)', () => {
        expect(res.status).to.be.eql(201)
      })

      it('should return created category', () => {
        expect(res.body).to.have.property('name', fixture.name)
      })
    })

    context('when "name" is missing', () => {
      let res

      before(async () => {
        res = await app.post('/categories').send({ name: '' })
      })

      it('should return 422 (Unprocessable Entity)', () => {
        expect(res.status).to.be.eql(422)
      })

      it('should return error message', () => {
        expect(res.body).to.be.eql({
          error: 'ValidationError',
          message: 'Field name is required'
        })
      })
    })
  })

  describe('PUT /categories/:id', () => {
    let fixtureId
    let dbCategory
    const oldFixture = { name: 'Massas' }
    const newFixture = { name: 'Massas e Frios' }

    before(async () => {
      const category = await Categories.create(oldFixture)
      fixtureId = category.id
    })

    after(async () => {
      await Categories.destroy({ where: { id: fixtureId } })
    })

    context('when category exists', () => {
      let res

      before(async () => {
        res = await app.put(`/categories/${fixtureId}`).send(newFixture)
        dbCategory = await Categories.findByPk(fixtureId)
      })

      it('should return status 200 (Ok)', () => {
        expect(res.status).to.be.eql(200)
      })

      it('should return updated category', () => {
        expect(res.body).to.have.property('id', fixtureId)
        expect(res.body).to.have.property('name', newFixture.name)
      })

      it('should update category in database', () => {
        expect(dbCategory).to.have.property('id', fixtureId)
        expect(dbCategory).to.have.property('name', newFixture.name)
      })
    })
    context('when category not exists', () => {
      let res

      before(async () => {
        res = await app.put('/categories/99999999').send({ name: 'new name' })
      })

      it('should return status 404 (Not Found)', () => {
        expect(res.status).to.be.eql(404)
      })

      it('should return error message', () => {
        expect(res.body).to.be.eql({
          error: 'NotFoundError',
          message: 'Category 99999999 not found'
        })
      })
    })

    context('when "name" is missing', () => {
      let res

      before(async () => {
        res = await app.put(`/categories/${fixtureId}`).send({ name: '' })
      })

      it('should return 422 (Unprocessable Entity)', () => {
        expect(res.status).to.be.eql(422)
      })

      it('should return error message', () => {
        expect(res.body).to.be.eql({
          error: 'ValidationError',
          message: 'Field name is required'
        })
      })
    })
  })

  describe('DELETE /categories/:id', () => {
    let fixtureId
    let dbCategory
    const fixture = { name: 'Moda' }

    before(async () => {
      const category = await Categories.create(fixture)
      fixtureId = category.id
    })

    context('when category exists', () => {
      let res

      before(async () => {
        res = await app.delete(`/categories/${fixtureId}`)
        dbCategory = await Categories.findByPk(fixtureId)
      })

      it('should return status 204 (No Content)', () => {
        expect(res.status).to.be.eql(204)
      })

      it('should return empty body', () => {
        expect(res.body).to.be.eql({})
      })

      it('should not find category in database', () => {
        expect(dbCategory).to.be.null
      })
    })
    context('when category not exists', () => {
      let res

      before(async () => {
        res = await app.delete('/categories/99999999')
      })

      it('should return status 404 (Not Found)', () => {
        expect(res.status).to.be.eql(404)
      })

      it('should return error message', () => {
        expect(res.body).to.be.eql({
          error: 'NotFoundError',
          message: 'Category 99999999 not found'
        })
      })
    })
  })
})
