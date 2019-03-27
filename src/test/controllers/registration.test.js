const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../app')

beforeEach(async () => {
  for (const i in mongoose.connection.collections) {
    await mongoose.connection.collections[i].deleteOne({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
})

describe('/user', () => {
  test('GET /user/new', async () => {
    const response = await request(app).get('/user/new')
    expect(response.statusCode).toBe(200)
    expect(response.get('Content-Type')).toBe('text/html; charset=utf-8')
  })

  test('POST /user', async () => {
    //supertest way
    const response = await request(app).post('/user').send({
      email: 'user@example.com',
      password: 'p4ssw0rd'
    })
    
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe("/session/new")
  })
})

