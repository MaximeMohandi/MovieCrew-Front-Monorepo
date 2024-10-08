import { rest } from "msw";
import { postNewMovie } from "../../../src/movies/api";
import { POST_MOVIE_ENDPOINT } from "../../../src/movies/api/endpoints";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import server, { interceptUrl, setupTest } from "../../setupApiTest";

setupTest();

describe("post movie", () => {
  it("should add a movie successfully", async () => {
    server.use(
      rest.post(interceptUrl(POST_MOVIE_ENDPOINT), (req, res, ctx) => {
        return res(ctx.json(1));
      }),
    );

    const movie = await postNewMovie("The Shawshank Redemption", "13844929842");

    expect(movie).toEqual(1);
  });

  it("should throw a AlreadyExistError if the request fails with 409", async () => {
    server.use(
      rest.post(interceptUrl(POST_MOVIE_ENDPOINT), (req, res, ctx) => {
        return res(ctx.status(409));
      }),
    );

    await expect(
      postNewMovie("The Shawshank Redemption", "13844929842"),
    ).rejects.toThrow(ERROR_MESSAGES.MovieAlereadyExist);
  });

  it("should throw a MovieFetchError if the request fails", async () => {
    server.use(
      rest.post(interceptUrl(POST_MOVIE_ENDPOINT), (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(
      postNewMovie("The Shawshank Redemption", "13844929842"),
    ).rejects.toThrow(ERROR_MESSAGES.AddMovieFailed);
  });
});
