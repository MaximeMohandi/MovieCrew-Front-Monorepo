import {
  MovieFetchError,
  NoMovieFoundError,
  getMovie,
} from "../../../src/movies";
import { fetchMovie } from "../../../src/movies/api";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import movie from "../fixtures/movie.json";

jest.mock("../../../src/movies/api", () => ({
  fetchMovie: jest.fn(() => Promise.resolve(movie)),
}));

describe("getMovie", () => {
  it("by id should return movie", async () => {
    const result = await getMovie({ id: 100 });

    expect(result).toEqual(movie);
  });

  it("by title should return movie", async () => {
    const result = await getMovie({ title: "Superman" });

    expect(result).toEqual(movie);
  });

  it("should return empty object if NoMoviesFound", async () => {
    (fetchMovie as jest.Mock).mockRejectedValueOnce(new NoMovieFoundError());

    await expect(getMovie({ id: 100 })).rejects.toThrow(
      ERROR_MESSAGES.NoMovieFound,
    );
  });

  it("should throw error when failed to fetch movies", async () => {
    (fetchMovie as jest.Mock).mockRejectedValueOnce(new MovieFetchError());

    await expect(getMovie({ id: 100 })).rejects.toThrow(
      ERROR_MESSAGES.FailedToFetchMovie,
    );
  });

  it("should throw error when no id or title provided", async () => {
    await expect(getMovie({})).rejects.toThrow(
      new Error(ERROR_MESSAGES.EitherIdOrTitleShouldBeProvided),
    );
  });
});
