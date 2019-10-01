const request = require("supertest");
const app = require("../../index");
describe("Testing PLayerRankings API", () => {
  it("(Fetch playerRankings) should return a status code of 200 and a message", done => {
    let data = {
      type: "Batting",
      format: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/ranking")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all players Successfully"
        );
        done();
      });
  });

  it("(Fetch TeamRankings) should return a status code of 200 and a message", done => {
    let data = {
      format: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/teamranking")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all team ranking Successfully"
        );
        done();
      });
  });
});
