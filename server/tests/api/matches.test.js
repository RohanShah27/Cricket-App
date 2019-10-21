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
  //get by team
  it("(Get By Team) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      team_name: "India"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbyteam")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });
  //negative test case for get by team
  it("(Get By Team) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbyteam")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });

  //get by team and type
  it("(Get By Team and Type) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      team_name: "India",
      match_type: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbyteamandtype")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });
  //negative
  it("(Get By Team and Type) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbyteamandtype")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });

  //get by date
  it("(Get By Date) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      team_name: "India",
      match_type: "ODI",
      match_date: "10-10-2016"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbydate")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });
  //negative
  it("(Get By Date) should return a status code of 400 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbydate")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Server Error");
        done();
      });
  });

  //get by type
  it("(Get By Type) should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    let data = {
      type: "ODI"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbytype")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });

  //negative
  it("(Get By Type) should return a status code of 200 and a message", done => {
    let data = {};
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/matches/getbytype")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all matches successfully"
        );
        done();
      });
  });

  //get summary
  it("should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/matches/summary/" + 1)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe(
          "Retrived matches list by date successfully!!"
        );
        done();
      });
  });

  //get match details
  it("should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/matches/getmatchdetails/" + 1)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved selected match successfully"
        );
        done();
      });
  });

  //get scorecard
  it("should return a status code of 200, the body should be an object, a message in the body, the data should be an array", done => {
    request(app)
      .get("/api/matches/getscorecard/" + 1)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved selected match successfully"
        );
        done();
      });
  });
});
