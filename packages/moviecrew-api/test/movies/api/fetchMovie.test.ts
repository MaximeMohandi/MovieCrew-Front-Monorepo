import { fetchMovie } from "@movies/api";
import { GET_MOVIE_ENDPOINT } from "@movies/api/endpoints";
import { rest } from "msw";
import server, { setupTest } from "../../setupApiTest";
import movie from "../fixtures/movie.json";

setupTest();

describe("fetchMovie", () => {
  it("should return movie", async () => {
    server.use(
      rest.get(GET_MOVIE_ENDPOINT, (req, res, ctx) => {
        return res(ctx.json(movie));
      }),
    );

    const result = await fetchMovie({ id: 100 });

    expect(result).toEqual(movie);
  });

  it("should throw error when no movie found", async () => {
    server.use(
      rest.get(GET_MOVIE_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(fetchMovie({ id: 100 })).rejects.toThrow("No movie found");
  });

  it("should throw error when failed to fetch movie", async () => {
    await expect(fetchMovie({ id: 100 })).rejects.toThrow(
      "Failed to fetch movie",
    );
  });
});
