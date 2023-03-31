/* eslint-disable no-undef */
import supertest from 'supertest'
import createServer from '../../utils/server'

const app = createServer()

describe('test galery API', () => {
  it('return data', async () => {
    await supertest(app).get('/api/v1/images').expect(200)
  })
  it('return data with search by tag', async () => {
    await supertest(app).get('/api/v1/images/tags?tag=cutecat').expect(200)
  })
})
