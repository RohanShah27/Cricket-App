const request = require("supertest");
const app = require("../../index");
describe("Testing Teams API", () => {
  it("(Fetch Team By Tournament) should return a status code of 200 and a message", done => {
    let data = {
      tournament: "International"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/tournament")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all tournaments  sccessfully"
        );
        done();
      });
  });
});
