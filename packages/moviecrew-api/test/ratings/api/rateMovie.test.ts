import { rateMovie } from "@ratings/api";
import POST_RATE_MOVIE_ENDPOINT from "@ratings/api/endpoints";
import { rest } from "msw";
import server, { setupTest } from "../../setupApiTest";

setupTest();

describe("rateMovie", () => {
  it("should return the movie id if rated sucessfully", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(100));
      }),
    );
    const updatedMovieId = await rateMovie(1, 1, 2.0);
    expect(updatedMovieId).toBe(100);
  });

  it("should return a RateError if the response is different from 201", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    await expect(rateMovie(1, 1, 2.0)).rejects.toThrow("Error while rating");
  });

  it("should return an error if rate is out of bound", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: "The rate must be between 0 and 10. Actual : 11",
          }),
        );
      }),
    );
    await expect(rateMovie(1, 1, 11)).rejects.toThrow(
      "The rate must be between 0 and 10. Actual : 11",
    );
  });

  it("should return a RateError if not successful", async () => {
    server.use(
      rest.post(`${POST_RATE_MOVIE_ENDPOINT}`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );
    await expect(rateMovie(1, 1, 2.0)).rejects.toThrow("Error while rating");
  });
});
