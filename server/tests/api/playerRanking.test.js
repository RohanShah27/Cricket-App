const request = require("supertest");
const app = require("../../index");
describe("Testing PLayerRankings API", () => {
  it("should return a status code of 200 for recent matches, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/playerRanking/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe(
          "Retrieved all players Successfully"
        );
        done();
      });
  });

  it("(Fetch playerRankings) should return a status code of 200 and a message", done => {
    let data = {
      format: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/playerRanking/ranking")
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
      .post("/api/playerRanking/teamranking")
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

  //negative
  it("(Fetch TeamRankings) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/playerRanking/teamranking")
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
