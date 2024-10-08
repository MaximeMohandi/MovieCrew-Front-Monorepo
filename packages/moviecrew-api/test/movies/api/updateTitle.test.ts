import { rest } from "msw";
import { updateMovieTitle } from "../../../src/movies/api";
import { PATCH_MOVIE_TITLE_ENDPOINT } from "../../../src/movies/api/endpoints";
import { ERROR_MESSAGES } from "../../../src/movies/errors";
import server, { interceptUrl, setupTest } from "../../setupApiTest";

setupTest();

describe("update movie title", () => {
  it("should not throw error when updated successfully", async () => {
    server.use(
      rest.put(interceptUrl(PATCH_MOVIE_TITLE_ENDPOINT(1)), (req, res, ctx) => {
        return res(ctx.status(200));
      }),
    );
    await expect(updateMovieTitle(1, "new title")).resolves.not.toThrow();
  });

  it("should throw updateMovie error when not updated successfully", async () => {
    server.use(
      rest.put(interceptUrl(PATCH_MOVIE_TITLE_ENDPOINT(1)), (req, res, ctx) => {
        return res(ctx.status(400));
      }),
    );
    await expect(updateMovieTitle(1, "new title")).rejects.toThrow(
      ERROR_MESSAGES.UpdateMovieFailed,
    );
  });

  it("should throw an error when movie already exist", async () => {
    server.use(
      rest.put(interceptUrl(PATCH_MOVIE_TITLE_ENDPOINT(1)), (req, res, ctx) => {
        return res(ctx.status(409));
      }),
    );
    await expect(updateMovieTitle(1, "new title")).rejects.toThrow(
      ERROR_MESSAGES.MovieAlereadyExist,
    );
  });
});
