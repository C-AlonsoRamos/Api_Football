const request = require('supertest')

const server = require('../../index')

describe('POST /api/teams', () => {
  test('should store a new team', async () => {
    await request(server)
      .post('/api/teams')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })
})
