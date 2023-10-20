import { addMovie, NoMovieFoundError } from "../../../src/movies";
import { fetchMovie } from "../../../src/movies/api";
import { ERROR_MESSAGES } from "../../../src/movies/errors";

const movieAdded = {
  id: 1,
  title: "The Shawshank Redemption",
  poster: "sdfqdsfddddddd",
  description: "",
  dateAdded: new Date().toLocaleString("fr-FR", { hour12: false }),
  viewingDate: null,
  averageRate: null,
};

jest.mock("../../../src/movies/api", () => ({
  postNewMovie: jest.fn(() => Promise.resolve(1)),
  fetchMovie: jest.fn(() => Promise.resolve(movieAdded)),
}));

describe("add Movie", () => {
  it("should add a movie successfully", async () => {
    const movie = await addMovie("The Shawshank Redemption", "13844929842");
    expect(movie).toEqual(movieAdded);
  });

  it("should throw an error if added but can't be found", async () => {
    (fetchMovie as jest.Mock).mockRejectedValueOnce(new NoMovieFoundError());
    await expect(
      addMovie("The Shawshank Redemption", "13844929842"),
    ).rejects.toThrow(ERROR_MESSAGES.MovieAddedButNotFound);
  });
});
