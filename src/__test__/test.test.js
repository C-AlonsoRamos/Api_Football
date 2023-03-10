const request = require('supertest')

const server = require('../../index')

describe('POST /api/teams', () => {
  it('should store a new team', async () => {
    const res = await request(server).post('/api/teams').send({
      name: 'atm',
      city: 'Madrid',
      foundation: 444,
      logo: 'atm.jpg',
    })

    expect(res.statusCode).toEqual(201)
  })
})
