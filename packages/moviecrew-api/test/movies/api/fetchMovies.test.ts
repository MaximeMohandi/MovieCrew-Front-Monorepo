import { rest } from "msw";
import { fetchMovies } from "../../../src/movies/api";
import { GET_MOVIES_ENDPOINT } from "../../../src/movies/api/endpoints";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import server, { setupTest } from "../../setupApiTest";
import movieList from "../fixtures/movieList.json";

setupTest();

describe("getMovies", () => {
  it("should return array of movie", async () => {
    server.use(
      rest.get(GET_MOVIES_ENDPOINT, (req, res, ctx) => {
        return res(ctx.json(movieList));
      }),
    );

    const result = await fetchMovies();
    expect(result).toEqual(movieList);
  });

  it("should throw error when no movie found", async () => {
    server.use(
      rest.get(GET_MOVIES_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(fetchMovies()).rejects.toThrow(ERROR_MESSAGES.NoMovieFound);
  });

  it("should throw error when failed to fetch movies", async () => {
    await expect(fetchMovies()).rejects.toThrow(
      ERROR_MESSAGES.FailedToFetchMovie,
    );
  });
});
