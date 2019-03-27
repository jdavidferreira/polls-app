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

// // Esto soluciona un issue de Jest con las cookies en Superagent. Ver
// // https://github.com/facebook/jest/issues/2549
// request.agent.prototype._saveCookies = function(res) {
//   const cookies = res.headers['set-cookie']
//   if (cookies) this.jar.setCookies(cookies[0].split(","))
// }

// const signIn = async (credentials) => {
//   const agent = request.agent(app)
//   await agent.post('/login')
//       .type("form")
//       .send(credentials)

//   return agent
// }



describe('/session', () => {
  test('GET /session/new', async () => {
    const response = await request(app).get('/session/new')
    expect(response.statusCode).toBe(200)
    expect(response.get('Content-Type')).toBe('text/html; charset=utf-8')
  })

  test('POST /session', async () => {
    let credentials = {
      email: 'tmp@example.com',
      password: 'p4ssw0rd'
    }

    const response = await request(app).post('/user').send(credentials)

    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toBe("/session/new")

    const response2 = await request(app).post('/session').send(credentials)

    expect(response2.statusCode).toBe(302) //is redirect
    expect(response2.headers.location).toBe("/")
  })
})