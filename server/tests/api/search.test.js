const request = require("supertest");
const app = require("../../index");

describe("Global Search Feature", () => {
  it("Should retrieve array of object of teams and players", done => {
    let search_term = {
      search_term: "Virat "
    };
    let payload = JSON.stringify(search_term);
    request(app)
      .post("/api/searchfeature/search")
      .send(payload)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Search Result Returned");
        done();
      });
  });
  //negative
  it("Should retrieve array of object of teams and players", done => {
    let search_term = {
      search_term: ""
    };
    let payload = JSON.stringify(search_term);
    request(app)
      .post("/api/searchfeature/search")
      .send(payload)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Search Result Returned");
        done();
      });
  });
});
