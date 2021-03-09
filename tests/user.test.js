const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userId = new mongoose.Types.ObjectId();
const userProfileTest = {
  _id: userId,
  name: "Chnir Beitzah",
  email: "chnir@gmail.com",
  password: "BbAAAa123456",
  tokens: [
    {
      token: jwt.sign({ _id: userId }, process.env.JWT_SECRET),
    },
  ],
};

beforeAll(async () => {
  await User.findOneAndDelete({ email: "chnir@gmail.com" });
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Chnir Beitzah",
      email: "chnir@gmail.com",
      password: "BbAAAa123456",
    })
    .expect(201);
});

test("Should login the new user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "chnir@gmail.com",
      password: "BbAAAa123456",
    })
    .expect(200);
});

test("Login should fail", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "chnir@gmail.com",
      password: "Bibisucks!",
    })
    .expect(400);
});

test("Get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userProfileTest.tokens[0].token}`)
    .send()
    .expect(200);
});
