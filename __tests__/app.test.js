import supertest from "supertest";
import app from "../app";

const restClient = supertest(app)

describe("API", () => {

  test("home route", async () => {
    const result = await restClient.get("/")

    expect(result.statusCode).toBe(200)
    expect(result.text).toMatch(/Hello from Api/i) // if route returns text => check .text instead of .body
  })

})