import { addMovie } from "@movies/services";

const movieAdded = {
  id: 1,
  title: "The Shawshank Redemption",
  poster: "sdfqdsfddddddd",
  description: "",
  dateAdded: new Date().toLocaleString("fr-FR", { hour12: false }),
  viewingDate: null,
  averageRate: null,
};

jest.mock("@movies/api", () => ({
  postNewMovie: jest.fn(() => Promise.resolve(1)),
  fetchMovie: jest.fn(() => Promise.resolve(movieAdded)),
}));

describe("add Movie", () => {
  it("should add a movie successfully", async () => {
    const movie = await addMovie("The Shawshank Redemption", "13844929842");
    expect(movie).toEqual(movieAdded);
  });
});
