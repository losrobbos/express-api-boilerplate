import supertest from 'supertest';
import app from '../app';

const restClient = supertest(app);

describe('API', () => {
  test('home route', async () => {
    const result = await restClient.get('/');

    expect(result.statusCode).toBe(200);
    expect(result.text).toMatch(/Hello from Api/i); // if route returns text => check .text instead of .body
  });

  test('login with wrong credentials', async () => {
    const credentialsWrong = { email: 'rob@rob.com', password: 'rob333' };
    const response = await restClient.post('/auth/login').send( credentialsWrong );

    expect(response.statusCode).toBe(400)
  });

  test('login with correct credentials', async () => {
    const credentials = { email: 'rob@rob.com', password: 'rob123' };
    let response = await restClient.post('/auth/login').send( credentials );

    console.log(response.headers.authorization)

    expect(response.statusCode).toBe(200)
    expect(response.headers.authorization).toBeDefined()
    expect(response.body).toBeDefined()
    expect(response.body.password).toBeUndefined()

    // store token received from login in variable
    const token = response.headers.authorization

    // expect to fail access to protected route when no token is provided
    response = await restClient.get("/protected")
    expect(response.statusCode).toBe(401)

    // expect to access protected route when valid token is provided
    response = await restClient.get("/protected").set("Authorization", token)
    expect(response.statusCode).toBe(200)
  });

});
