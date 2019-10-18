const request = require("supertest");
const app = require("../../index");
describe("Testing Teams API", () => {
  it("(Fetch Team By Tournament) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
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
          "Retrieved all tournaments  successfully"
        );
        done();
      });
  });

  //negative
  it("(Fetch Team By Tournament) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/tournament")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all tournaments  successfully"
        );
        done();
      });
  });

  //playerstatsforteams
  it("(Player Stats for Teams) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      match_type: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/playerstatsforteams/" + 1)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved all data successfully");
        done();
      });
  });
  //negative
  it("(Player Stats for Teams) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/playerstatsforteams/" + 1)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved all data successfully");
        done();
      });
  });

  it("(Player Stats for Teams Bowler) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      match_type: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/playerstatsforteamsbowler/" + 1)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved all data successfully");
        done();
      });
  });

  //negative
  it("(Player Stats for Teams Bowler) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/playerstatsforteamsbowler/" + 1)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved all data successfully");
        done();
      });
  });

  it("(Team By Id) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      team_id: "1"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/teambyid")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved team successfully");
        done();
      });
  });

  it("(Match Type) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/team/matchtype/" + 1)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe(
          "Retrieved search info successfully"
        );
        done();
      });
  });

  it("(Team Search) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      team_name: "India"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/team/teamsearch")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved team successfully");
        done();
      });
  });

  // negative
  // it("(Team Search) should return a status code of 404 and a message", done => {
  //   let data = {};
  //   let payload = JSON.stringify(data);
  //   request(app)
  //     .post("/api/team/teamsearch")
  //     .send(payload)
  //     .set("Content-type", "application/json")
  //     .then(response => {
  //       expect(response.statusCode).toBe(404);
  //       expect(response.body).toEqual(expect.any(Object));
  //       expect(response.body.message).toBe(
  //         "Cannot find team with the specified name"
  //       );
  //       done();
  //     });
  // });
});
