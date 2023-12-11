import { PaginationItem } from "@discordx/pagination";
import { BaseMessageOptions } from "discord.js";
import {
  UnseenMoviesNotFound,
  getMovie,
  getMovies,
  getRandomMovie,
  getUnseenMovies,
  type OrderBy,
  type SortBy,
} from "moviecrew-api";
import { movieListOrError, movieOrError } from "./movieResponseWrapper";

export const movieListMessage = async (
  sortOption?: SortBy,
  orderOption?: OrderBy,
): Promise<PaginationItem[]> =>
  movieListOrError(() => getMovies(sortOption, orderOption), "Movie List");

export const toWatchListMessage = async (
  sortOption?: SortBy,
  orderOption?: OrderBy,
): Promise<PaginationItem[]> =>
  movieListOrError(
    () => getUnseenMovies(sortOption, orderOption),
    "To Watch List",
  );

export const detailledMovieMessage = async ({
  movieId = undefined,
  movieTitle = undefined,
}: {
  movieId?: number;
  movieTitle?: string;
}): Promise<BaseMessageOptions> =>
  movieOrError(() => getMovie({ title: movieTitle, id: movieId }));

export const randomMovieMessage = async (): Promise<BaseMessageOptions> =>
  movieOrError(async () => {
    const movie = await getRandomMovie();

    if (!movie || movie === null) {
      throw new UnseenMoviesNotFound();
    }
    return movie;
  });
