const supertest = require('supertest')
const Categories = require('../../models/categories')
const app = supertest(require('../../app'))

describe('[Acceptance] Categories', () => {
  let res
  describe('GET /categories', () => {
    const fixtures = [
      { id: 1, name: 'Esportes' },
      { id: 2, name: 'Decoração' },
      { id: 3, name: 'Informática' },
      { id: 4, name: 'Móveis' },
      { id: 5, name: 'Roupas' }
    ]

    before(async () => {
      await Categories.bulkCreate(fixtures)
    })

    after(async () => {
      await Categories.truncate()
    })

    context('without params', () => {
      before(async () => {
        res = await app.get('/categories')
      })

      it('should return status 200 (OK)', () => {
        expect(res.status).to.be.eql(200)
      })

      it('should return list of categories', () => {
        const { _meta, data } = res.body
        expect(_meta.count).to.be.eql(fixtures.length)
        expect(data).to.be.eql(fixtures)
      })
    })

    context('with params', () => {
      context('pagination', () => {
        context('without params', () => {
          before(async () => {
            res = await app.get('/categories').query({ limit: undefined, offset: undefined })
          })

          it('should return data', () => {
            const { _meta, data } = res.body
            expect(_meta.count).to.be.eql(fixtures.length)
            expect(data).to.be.eql(fixtures)
          })

          it('should limit default be 10', () => {
            const { _meta } = res.body
            expect(_meta.limit).to.be.eql(10)
          })

          it('should offset default be 0', () => {
            const { _meta } = res.body
            expect(_meta.offset).to.be.eql(0)
          })
        })

        context('when use limit', () => {
          before(async () => {
            res = await app.get('/categories').query({ limit: 3 })
          })

          it('should limit results', () => {
            const { _meta, data } = res.body
            expect(_meta.count).to.be.eql(fixtures.length)
            expect(_meta.limit).to.be.eql(3)
            expect(data).to.be.eql([fixtures[0], fixtures[1], fixtures[2]])
          })
        })

        context('when use offset', () => {
          before(async () => {
            res = await app.get('/categories').query({ offset: 3 })
          })

          it('should start from offset', () => {
            const { _meta, data } = res.body
            expect(_meta.count).to.be.eql(fixtures.length)
            expect(_meta.offset).to.be.eql(3)
            expect(data).to.be.eql([fixtures[3], fixtures[4]])
          })
        })
      })
      context('sorting', () => {})
      context('filters', () => {
        context('when filter by "name"', () => {
          before(async () => {
            res = await app.get('/categories').query({ name: 'Informática' })
          })

          it('should return status 200 (OK)', () => {
            expect(res.status).to.be.eql(200)
          })

          it('should return only "Informática"', () => {
            const { _meta, data } = res.body
            expect(_meta.count).to.be.eql(1)
            expect(data).to.be.eql([{ id: 3, name: 'Informática' }])
          })
        })

        context('when filter by "name__contains"', () => {
          before(async () => {
            res = await app.get('/categories').query({ name__contains: 'sport' })
          })

          it('should return status 200 (OK)', () => {
            expect(res.status).to.be.eql(200)
          })

          it('should return only "Esportes"', () => {
            const { _meta, data } = res.body
            expect(_meta.count).to.be.eql(1)
            expect(data).to.be.eql([{ id: 1, name: 'Esportes' }])
          })
        })
      })
    })
  })

  describe('GET /categories/:id', () => {
    const fixture = { id: 1, name: 'Alimentação' }

    before(async () => {
      await Categories.create(fixture)
    })

    after(async () => {
      await Categories.truncate()
    })

    context('when category exists', () => {
      before(async () => {
        res = await app.get(`/categories/${fixture.id}`)
      })

      it('should return status 200 (Ok)', () => {
        expect(res.status).to.be.eql(200)
      })

      it('should return matching category', () => {
        expect(res.body).to.be.eql(fixture)
      })
    })
    context('when category not exists', () => {
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
      const fixture = { id: 1, name: 'Tecnologia' }

      before(async () => {
        res = await app.post('/categories').send(fixture)
      })

      after(async () => {
        await Categories.truncate()
      })

      it('should return 201 (Created)', () => {
        expect(res.status).to.be.eql(201)
      })

      it('should return created category', () => {
        expect(res.body).to.be.eql(fixture)
      })
    })

    context('when "name" is missing', () => {
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
    let dbCategory
    const oldFixture = { id: 1, name: 'Massas' }
    const newFixture = { name: 'Massas e Frios' }

    before(async () => {
      await Categories.create(oldFixture)
    })

    after(async () => {
      await Categories.truncate()
    })

    context('when category exists', () => {
      before(async () => {
        res = await app.put(`/categories/${oldFixture.id}`).send(newFixture)
        dbCategory = await Categories.findByPk(oldFixture.id)
      })

      it('should return status 200 (Ok)', () => {
        expect(res.status).to.be.eql(200)
      })

      it('should return updated category', () => {
        expect(res.body).to.have.property('id', oldFixture.id)
        expect(res.body).to.have.property('name', newFixture.name)
      })

      it('should update category in database', () => {
        expect(dbCategory).to.have.property('id', oldFixture.id)
        expect(dbCategory).to.have.property('name', newFixture.name)
      })
    })
    context('when category not exists', () => {
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
      before(async () => {
        res = await app.put(`/categories/${oldFixture.id}`).send({ name: '' })
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
    let dbCategory
    const fixture = { id: 1, name: 'Moda' }

    before(async () => {
      await Categories.create(fixture)
    })

    context('when category exists', () => {
      before(async () => {
        res = await app.delete(`/categories/${fixture.id}`)
        dbCategory = await Categories.findByPk(fixture.id)
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
