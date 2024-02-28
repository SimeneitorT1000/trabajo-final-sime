

const request = require("supertest")
const app = require("../app")

const URL_BASE = '/users'
let TOKEN
let userId

const user = {
  firstName: 'Martín',
  lastName: "muro",
  email: "sime@gmail.com",
  password: 'cris1234',
  phone: '+51997603115'
}

beforeAll(async () => {
  const user = {
    email: "simecristiano@gmail.com",
    password: 'cristiano1234'
  }

  const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)


  TOKEN = res.body.token
  // console.log(TOKEN);

})

test("GET '/users', should return statusCode: 200, res.body to defined and res.body.length === 1 ", async() => {

  const res = await request(app)
   .get(URL_BASE)
   .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
});

test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.firstName === user.firstName ", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(user)
console.log(res.body);
  userId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)


 

})

test("PUT -> 'URL_BASE/:id', should return status code 200, res.body to be defined and res.body.firstName = 'Frednerys'", async () => {

  const res = await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send({ firstName: "Frednerys" })
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe('Frednerys')
 

})

test("POST -> 'URL_BASE/login', should return status code 200, res.body to be defined, res.body.user.email === user.email, and res.body.token to be defined", async () => {
  const userLogin = {
    email: 'simecristiano@gmail.com',
    password: 'cristiano1234'
  }

  const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)

 
})

test("POST -> 'URL_BASE/login', should return status code 401", async () => {
  const userLogin = {
    email: 'rene@gmail.com',
    password: 'invalid password'
  }

  const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)

  expect(res.statusCode).toBe(401)
})

test("DELETE -> 'URL_BASE/:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(204)

  
}) 

