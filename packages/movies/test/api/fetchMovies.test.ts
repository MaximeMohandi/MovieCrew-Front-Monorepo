import { fetchMovies } from "@movies/api";
import { ERROR_MESSAGES } from "@movies/errors";
import { GET_MOVIES_ENDPOINT } from "@movies/shared/constants";
import { rest } from "msw";
import movieList from "../fixtures/movieList.json";
import server, { setupTest } from "./setupApiTest";

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
