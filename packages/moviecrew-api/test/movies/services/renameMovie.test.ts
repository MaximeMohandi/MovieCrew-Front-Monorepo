import {
  MovieAlreadyExistError,
  NoMovieFoundError,
  renameMovie,
} from "../../../src/movies";
import { fetchMovie, updateMovieTitle } from "../../../src/movies/api";
import { ERROR_MESSAGES } from "../../../src/movies/errors";

const updatedMovie = {
  id: 1,
  title: "new title",
  proposedBy: "me",
  dateAdded: new Date().toISOString(),
  viewingDate: new Date().toISOString(),
  rate: 5,
};

jest.mock("../../../src/movies/api", () => ({
  updateMovieTitle: jest.fn(() => Promise.resolve(updatedMovie)),
  fetchMovie: jest.fn(() => Promise.resolve(updatedMovie)),
}));

describe("rename movie", () => {
  it("should return Movie updated when renamed successfully", async () => {
    const result = await renameMovie(1, "new title");
    expect(result).toBe(updatedMovie);
  });

  it("should throw an error when movie already exist", async () => {
    (updateMovieTitle as jest.Mock).mockRejectedValueOnce(
      new MovieAlreadyExistError(),
    );
    await expect(renameMovie(1, "new title")).rejects.toThrow(
      ERROR_MESSAGES.MovieAlereadyExist,
    );
  });

  it("should throw an error when movie not found", async () => {
    (fetchMovie as jest.Mock).mockRejectedValueOnce(new NoMovieFoundError());
    await expect(renameMovie(1, "new title")).rejects.toThrow(
      ERROR_MESSAGES.MovieUpdatedButNotFound,
    );
  });
});
