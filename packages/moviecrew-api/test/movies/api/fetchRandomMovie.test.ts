import { rest } from "msw";
import { MovieFetchError } from "../../../src/movies";
import { fetchRandomMovie } from "../../../src/movies/api";
import { GET_RANDOM_MOVIE_ENDPOINT } from "../../../src/movies/api/endpoints";
import server, { setupTest } from "../../setupApiTest";
import movies from "../fixtures/movieList.json";

setupTest();

describe("fetch random movie from list", () => {
  it("should return a random movie", async () => {
    server.use(
      rest.get(GET_RANDOM_MOVIE_ENDPOINT, (req, res, ctx) => {
        const randIndex = Math.floor(Math.random() * movies.length);
        const randMovie = movies[randIndex];
        return res(ctx.json(randMovie));
      }),
    );
    const result = await fetchRandomMovie();
    expect(movies.map(String)).toContain(String(result));
  });

  it("should return null when no movie found", async () => {
    server.use(
      rest.get(GET_RANDOM_MOVIE_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(204));
      }),
    );
    const result = await fetchRandomMovie();
    expect(result).toEqual(null);
  });

  it("should throw error when failed to fetch random movie", async () => {
    await expect(fetchRandomMovie()).rejects.toThrowError(MovieFetchError);
  });
});
