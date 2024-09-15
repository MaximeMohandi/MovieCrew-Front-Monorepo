import { rest } from "msw";
import { fetchMovies } from "../../../src/movies/api";
import { GET_MOVIES_ENDPOINT } from "../../../src/movies/api/endpoints";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import server, { interceptUrl, setupTest } from "../../setupApiTest";
import movieList from "../fixtures/movieList.json";

setupTest();

describe("getMovies", () => {
  it("should return array of movie", async () => {
    server.use(
      rest.get(interceptUrl(GET_MOVIES_ENDPOINT), (req, res, ctx) => {
        return res(ctx.json(movieList));
      }),
    );

    const expected = [
      {
        id: 1,
        title: "New Mutants",
        poster:
          "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
        description: null,
        dateAdded: new Date("2021-03-21T15:57:35"),
        viewingDate: new Date("2021-03-25T15:00:00"),
        averageRate: 2.1,
      },
      {
        id: 2,
        title: "Stuart Little",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: new Date("2021-03-23T15:57:56"),
        viewingDate: new Date("2021-03-26T21:30:00"),
        averageRate: 5.125,
      },
      {
        id: 3,
        title: "Dragon 2",
        poster:
          "https://dailymars-cdn-fra1.fra1.digitaloceanspaces.com/wp-content/uploads/2014/04/dragon.jpg",
        description: null,
        dateAdded: new Date("2021-03-20T15:58:08"),
        viewingDate: new Date("2021-02-25T21:00:00"),
        averageRate: 5.7,
      },
      {
        id: 4,
        title: "The Creator",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: new Date("2021-03-23T15:57:56"),
        viewingDate: null,
        averageRate: null,
      },
      {
        id: 5,
        title: "Matrix",
        poster:
          "https://i.pinimg.com/originals/b5/fa/1c/b5fa1ca5079b6fa67d19e93e9d94c5ca.jpg",
        description: null,
        dateAdded: new Date("2021-03-23T15:57:56"),
        viewingDate: new Date("2021-02-25T21:00:00"),
        averageRate: 0,
      },
    ];

    const result = await fetchMovies();
    expect(result).toEqual(expected);
  });

  it("should throw error when no movie found", async () => {
    server.use(
      rest.get(interceptUrl(GET_MOVIES_ENDPOINT), (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(fetchMovies()).rejects.toThrow(ERROR_MESSAGES.NoMovieFound);
  });

  it("should throw error when failed to fetch movies", async () => {
    await expect(fetchMovies()).rejects.toThrow(
      ERROR_MESSAGES.FailedToFetchMovie,
    );
  });
});
