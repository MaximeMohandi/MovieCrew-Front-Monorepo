import {
  getUnseenMovies,
  NoMovieFoundError,
  UnseenMoviesNotFound,
} from "../../../src/movies";
import { fetchMovies } from "../../../src/movies/api";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import movieListWithUnseen from "../fixtures/movieListWithUnseen.json";

jest.mock("../../../src/movies/api", () => ({
  fetchMovies: jest.fn(() => Promise.resolve(movieListWithUnseen)),
}));

describe("getUnseenMovies", () => {
  it("should sort all movies and return movies with no viewing date descending", async () => {
    const result = await getUnseenMovies();

    expect(result).toEqual([
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: null,
        averageRate: null,
      },
      {
        id: 4,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: null,
        averageRate: null,
      },
    ]);
  });

  it("should not be possible to sort by viewing date", async () => {
    await expect(getUnseenMovies("viewingDate")).rejects.toThrow(
      new TypeError(ERROR_MESSAGES.SortByViewingDateNotPossible),
    );
  });

  it("should not be possible to sort by average rate", async () => {
    await expect(getUnseenMovies("rate")).rejects.toThrow(
      new TypeError(ERROR_MESSAGES.SortByRateNotPossible),
    );
  });

  it("should throw error when no movies found with no viewing date", async () => {
    (fetchMovies as jest.Mock).mockRejectedValueOnce(new NoMovieFoundError());
    await expect(getUnseenMovies()).rejects.toThrow(new UnseenMoviesNotFound());
  });
});
