const request = require("supertest");
const app = require("../../index");

it("should return status of 200 and a message", done => {
  let type = {
    type: "Test"
  };
  let payload = JSON.stringify(type);

  request(app)
    .post("/api/matches/getbytype")
    .send(payload)
    .set("Content-type", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body.message).toBe("Retrieved all matches successfully");
      done();
    });
});

it("should return status of 404 and a message", done => {
  let type = {
    type: "Test"
  };
  let payload = JSON.stringify(type);

  request(app)
    .post("/api/matches/getbymatch")
    .send(payload)
    .set("Content-type", "application/json")
    .then(response => {
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      done();
    });
});
