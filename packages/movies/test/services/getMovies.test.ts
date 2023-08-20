import { getMovies } from "@movies/services";
import movieList from "../fixtures/movieList.json";
import { fetchMovies } from "@movies/api";
import { ERROR_MESSAGES, NoMovieFoundError } from "@movies/errors";

jest.mock("@movies/api", () => ({
  fetchMovies: jest.fn(() => Promise.resolve(movieList)),
}));

describe("getMovies", () => {
  it("should be sort by rate by default descending when no argument passed", async () => {
    const expectedResult = [
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: "2021-02-25T21:00:00",
        averageRate: 5.7,
      },
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: "2021-03-26T21:30:00",
        averageRate: 5.125,
      },
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: "2021-03-21T15:57:35",
        viewingDate: "2021-03-25T15:00:00",
        averageRate: 2.1,
      },
    ];

    const result = await getMovies();

    expect(result).toEqual(expectedResult);
  });

  it("should be sort by date added descending", async () => {
    const expectedResult = [
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: "2021-03-26T21:30:00",
        averageRate: 5.125,
      },
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: "2021-03-21T15:57:35",
        viewingDate: "2021-03-25T15:00:00",
        averageRate: 2.1,
      },
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: "2021-02-25T21:00:00",
        averageRate: 5.7,
      },
    ];

    const result = await getMovies("dateAdded");

    expect(result).toEqual(expectedResult);
  });

  it("should be sort by title descending", async () => {
    const expectedResult = [
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: "2021-03-26T21:30:00",
        averageRate: 5.125,
      },
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: "2021-03-21T15:57:35",
        viewingDate: "2021-03-25T15:00:00",
        averageRate: 2.1,
      },
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: "2021-02-25T21:00:00",
        averageRate: 5.7,
      },
    ];

    const result = await getMovies("title");

    expect(result).toEqual(expectedResult);
  });

  it("should be sort by viewing date descending", async () => {
    const expectedResult = [
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: "2021-03-26T21:30:00",
        averageRate: 5.125,
      },
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: "2021-03-21T15:57:35",
        viewingDate: "2021-03-25T15:00:00",
        averageRate: 2.1,
      },
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: "2021-02-25T21:00:00",
        averageRate: 5.7,
      },
    ];

    const result = await getMovies("viewingDate");

    expect(result).toEqual(expectedResult);
  });

  it("should be sort by ascending when order is ascending", async () => {
    const expectedResult = [
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: "2021-03-21T15:57:35",
        viewingDate: "2021-03-25T15:00:00",
        averageRate: 2.1,
      },
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: "2021-03-23T15:57:56",
        viewingDate: "2021-03-26T21:30:00",
        averageRate: 5.125,
      },
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: "2021-03-20T15:58:08",
        viewingDate: "2021-02-25T21:00:00",
        averageRate: 5.7,
      },
    ];

    const result = await getMovies("rate", "asc");

    expect(result).toEqual(expectedResult);
  });

  it("should return error if NoMoviesFound", async () => {
    (fetchMovies as jest.Mock).mockRejectedValueOnce(new NoMovieFoundError());

    await expect(getMovies()).rejects.toThrow(ERROR_MESSAGES.NoMovieFound);
  });

  it("should throw error when failed to fetch movies", async () => {
    (fetchMovies as jest.Mock).mockRejectedValueOnce(
      new Error(ERROR_MESSAGES.FailedToFetchMovie),
    );

    await expect(getMovies()).rejects.toThrow(
      ERROR_MESSAGES.FailedToFetchMovie,
    );
  });
});
