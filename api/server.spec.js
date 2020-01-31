const request = require("supertest");
const server = require("./server.js");
const db = require("../database/dbConfig");
const jwt = require("jsonwebtoken");

describe("POST /api/auth/register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("Should success", async () => {
    const expectedBody = { username: "Hello", password: "Test1" };

    const response = await request(server)
      .post("/api/auth/register")
      .send(expectedBody);

    expect(response.body.message).toEqual("Create Success");
  });

  it("Should get status code", async () => {
    const expectedBody = { username: "Hello", password: "Test1" };

    const response = await request(server)
      .post("/api/auth/register")
      .send(expectedBody);

    expect(response.status).toEqual(201);
  });
});

describe("POST /api/auth/login", () => {
  it("Should get token", async () => {
    const expectedBody = { username: "Hello", password: "Test1" };
    const response = await request(server)
      .post("/api/auth/login")
      .send(expectedBody);
    const verify = jwt.verify(response.body.token, process.env.JWT_SECRET);
    expect(expectedBody.username).toBe(verify.username);
  });

  it("Should get success status code", async () => {
    const expectedBody = { username: "Hello", password: "Test1" };
    const response = await request(server)
      .post("/api/auth/login")
      .send(expectedBody);

    expect(response.status).toBe(200);
  });
});
