const request = require("supertest");

const app = require("../../index");
var id;
describe("Testing Contacts Api", () => {
  it("should return a status code 200,the body should be an object,a message in the body,the data should be an array", done => {
    request(app)
      .get("/api/user/all")
      .then(response => {
        id = response.body.data._id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Retrieved all users Successfully");
        done();
      });
  });
  it("should return status of 200 and a message", done => {
    let data = {
      password: "123456",
      email: "test@test5.com"
    };
    let payload = JSON.stringify(data);

    request(app)
      .post("/api/user/new")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("created one user successfully");
        done();
      });
  });
  it("should return status of 404 and a message", done => {
    let data = {
      password: "123123",
      email: "test@test5.com"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/new")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Cannot insert user");
        done();
      });
  });

  it("should return status of 200 and should provide a login successful", done => {
    let data = {
      password: "123456",
      email: "test@test5.com"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.text).toBe("Login Successfully");
      });
  });
});
it("should return status of 400 and should provide a login successful", done => {
  let data = {
    password: "1234567",
    email: "test@test5.com"
  };
  let payload = JSON.stringify(data);
  request(app)
    .post("/api/user/login")
    .send(payload)
    .set("Content-type", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.text).toBe("Login Failed");
      done();
    });
});
