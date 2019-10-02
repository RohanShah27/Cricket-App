const request = require("supertest");

const app = require("../../index");
var id;
describe("Testing Players Api", () => {
  it("should return a status code 200,the body should be an object,a message in the body,the data should be an array", done => {
    request(app)
      .get("/api/players/all")
      .then(response => {
        id = response.body.data._id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe(
          "Retrieved all players Successfully"
        );
        done();
      });
  });
  it("should return status of 200 and a message", done => {
    let data = {
      player_name: "Rohit Sharma",
      player_type: "Batsman",
      player_nation: "Indian",
      gender: "Male",
      player_dob: "23/07/1993",
      batting_style: "Left",
      bowling_style: "Spin"
    };
    let payload = JSON.stringify(data);

    request(app)
      .post("/api/players/new", +id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("created one player successfully");
        done();
      });
  });
  it("should return status of 404 and a message", done => {
    let data = {
      player_name: "Rohit Sharma",
      player_role: "Bowler",
      player_nation: "Indian",
      gender: "Male",
      player_dob: "23/07/1993",
      batting_style: "Left",
      bowling_style: "Spin"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/player/new")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Cannot insert player");
        done();
      });
  });
});
