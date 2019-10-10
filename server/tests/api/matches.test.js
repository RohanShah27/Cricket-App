const request = require("supertest");
const app = require("../../index");

describe("Testing Matches API's", () => {
  it("should return a status code of 200 for recent matches, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/matches/getrecent")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Retrieved Successfully");
        done();
      });
  });
});
