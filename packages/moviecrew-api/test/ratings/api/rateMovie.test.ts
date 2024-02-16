import { rest } from "msw";
import { rateMovie } from "../../../src/ratings";
import POST_RATE_MOVIE_ENDPOINT from "../../../src/ratings/api/endpoints";
import server, { setupTest } from "../../setupApiTest";

setupTest();

describe("rateMovie", () => {
  it("should return the movie id if rated sucessfully", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(100));
      }),
    );
    const updatedMovieId = await rateMovie(1, "1", 2.0);
    expect(updatedMovieId).toBe(100);
  });

  it("should return a RateError if the response is different from 201", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    await expect(rateMovie(1, "1", 2.0)).rejects.toThrow("Error while rating");
  });

  it("should return a RateError if not successful", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    await expect(rateMovie(1, "1", 2.0)).rejects.toThrow("Error while rating");
  });
});
