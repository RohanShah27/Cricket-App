const request = require("supertest");
const app = require("../../index");

describe("Testing Players API's", () => {
  it("should return a status code of 200 for players search, the body should be an object, a message in the body, the data should be an array", done => {
    let player = {
      playerName: "Virat Kohli"
    };
    request(app)
      .send(player)
      .post("/api/matches/player_search")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Player Retrieved");
        done();
      });
  });

  it("should return a status code of 400 for players search, the body should be an object, a message in the body, the data should be an array", done => {
    let player = {
      playerName: "Virat"
    };
    request(app)
      .send(player)
      .post("/api/matches/player_search")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Server Error");
        done();
      });
  });
});
