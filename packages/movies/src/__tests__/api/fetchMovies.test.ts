import { fetchMovies } from "@movies/api";
import movieList from "../fixtures/movieList.json";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { GET_MOVIES_ENDPOINT } from "@movies/shared/constants";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getMovies", () => {
  it("should return array of movie", async () => {
    server.use(
      rest.get(GET_MOVIES_ENDPOINT, (req, res, ctx) => {
        return res(ctx.json(movieList));
      })
    );

    const result = await fetchMovies();
    expect(result).toEqual(movieList);
  });

  it("should throw error when no movie found", async () => {
    server.use(
      rest.get(GET_MOVIES_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(fetchMovies()).rejects.toThrow("No movie found");
  });

  it("should throw error when failed to fetch movies", async () => {
    await expect(fetchMovies()).rejects.toThrow("Failed to fetch movies");
  });
});
