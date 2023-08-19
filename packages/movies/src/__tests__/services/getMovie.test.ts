import { getMovie } from "@movies/services";
import movie from "../fixtures/movie.json";
import { fetchMovie } from "@movies/api";
import { ERROR_MESSAGES, MovieError, NoMovieFoundError } from "@movies/errors";

jest.mock("@movies/api", () => ({
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

    await expect(getMovie({ id: 100 })).resolves.toEqual({});
  });

  it("should throw error when failed to fetch movies", async () => {
    (fetchMovie as jest.Mock).mockRejectedValueOnce(new MovieError());

    await expect(getMovie({ id: 100 })).rejects.toThrow(
      ERROR_MESSAGES.FailedToFetchMovie
    );
  });

  it("should throw error when no id or title provided", async () => {
    await expect(getMovie({})).rejects.toThrow(
      new Error(ERROR_MESSAGES.EitherIdOrTitleShouldBeProvided)
    );
  });
});