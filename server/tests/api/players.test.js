const request = require("supertest");
const app = require("../../index");

describe("Testing Players API's", () => {
  //   // Stats For player
  //   it("should return a status code of 200 for players search, the body should be an object, a message in the body, the data should be an array", done => {
  //     let playerId = 265;
  //     request(app)
  //       .post("/api/players/player_search/" + playerId)
  //       .then(response => {
  //         expect(response.statusCode).toBe(200);
  //         expect(response.body).toEqual(expect.any(Object));
  //         expect(response.body.data).toEqual(expect.any(Array));
  //         expect(response.body.message).toBe("Player Retrieved");
  //         done();
  //       });
  //   });

  //   it("should return a status code of 400 for players search, the body should be an object, a message in the body, the data should be an array", done => {
  //     let player = {
  //       playerName: "Virat"
  //     };
  //     request(app)
  //       .send(player)
  //       .post("/api/players/player_search/" + player)
  //       .then(response => {
  //         expect(response.statusCode).toBe(400);
  //         expect(response.body).toEqual(expect.any(Object));
  //         expect(response.body.data).toEqual(expect.any(Array));
  //         expect(response.body.message).toBe("Server Error");
  //         done();
  //       });
  //   });
  //   it("should return a status code of 200 for players search, the body should be an object, a message in the body, the data should be an array", done => {
  //     let playerName = {
  //       playerName: "Virat"
  //     };
  //     request(app)
  //       .send(player)
  //       .post("/api/players/searchPlayer/", playerName)
  //       .then(response => {
  //         expect(response.statusCode).toBe(200);
  //         expect(response.body).toEqual(expect.any(Object));
  //         expect(response.body.data).toEqual(expect.any(Array));
  //         expect(response.body.message).toBe("Player Found");
  //         done();
  //       });
  //   });
  //   it("should return a status code of 200 for players search, the body should be an object, a message in the body, the data should be an array", done => {
  //     let playerName = {
  //       playerName: "} "
  //     };
  //     request(app)
  //       .send(player)
  //       .post("/api/players/searchPlayer/", playerName)
  //       .then(response => {
  //         expect(response.statusCode).toBe(200);
  //         expect(response.body).toEqual(expect.any(Object));
  //         expect(response.body.data).toEqual(expect.any(Array));
  //         expect(response.body.message).toBe("Player Found");
  //         done();
  //       });
  //   });
  //RohanK

  //GET ALL PLAYERS
  it("should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/players/all")
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

  //SEARCH PLAYER
  it("(Search Player) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      playerName: "Virat Kohli"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/searchPlayer")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Player Found");
        done();
      });
  });

  //negative
  it("(Search Player) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/searchPlayer")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Player Found");
        done();
      });
  });

  //new players
  it("(New Player) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      player_name: "Virat Kohli",
      player_role: "Batsmen",
      nation: "Indian",
      gender: "male",
      player_dob: "12-04-1990",
      batting_style: "Right Handed",
      bowling_style: "Right arm"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/newplayers")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Inserted Player Successfully");
        done();
      });
  });

  //negative
  it("(New Player) should return a status code of 400 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/players/newplayers")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("player already exists");
        done();
      });
  });
});
