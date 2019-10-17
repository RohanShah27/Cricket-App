const request = require("supertest");
const app = require("../../index");

describe("Global Search Feature", () => {
  it("Should retrieve array of object of teams and players", done => {
    let search_term = {
      search_term: "Virat "
    };
    request(app)
      .send(search_term)
      .post("/api/searchfeature/search", search_term)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Search Result Returned");
        done();
      });
  });
  it("Should retrieve array of object of teams and players", done => {
    let search_term = {
      search_term: "} "
    };
    request(app)
      .send(search_term)
      .post("/api/searchfeature/search", search_term)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any([]));
        expect(response.body.message).toBe("Search Result Returned");
        done();
      });
  });
});
