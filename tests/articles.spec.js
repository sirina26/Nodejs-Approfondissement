const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model");
const articlesService = require("../api/articles/articles.service");

describe("Tester API articles", () => {
  let token;
  const USER_ID = "fake";
  const MOCK_DATA = [
    {
      _id: "articleId",
      title: "Mock Article",
      content: "test",
      user: USER_ID,
    },
  ];
  const MOCK_DATA_CREATED = {
    title: "Test Article",
    content: "Test",
    user: USER_ID,
  };

  beforeEach(() => {
    token = jwt.sign({ userId: USER_ID }, config.secretJwtToken);

    mockingoose(Article).toReturn(MOCK_DATA, "find");
    mockingoose(Article).toReturn(MOCK_DATA_CREATED, "save");
  });

  test("[Articles] Get All", async () => {
    const res = await request(app)
      .get("/api/articles")
      .set("x-access-token", token);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("[Articles] Create Article", async () => {
    const res = await request(app)
      .post("/api/articles")
      .send(MOCK_DATA_CREATED)
      .set("x-access-token", token);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(MOCK_DATA_CREATED.title);
  });

  test("Est-ce articlesService.getAll", async () => {
    const spy = jest
      .spyOn(articlesService, "getAll")
      .mockImplementation(() => "test");
    await request(app).get("/api/articles").set("x-access-token", token);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturnedWith("test");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
