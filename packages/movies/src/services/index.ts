import { fetchMovie, fetchMovies, fetchRandomMovie } from "@movies/api";
import { ERROR_MESSAGES } from "@movies/errors";
import type { Movie, MovieDetailled } from "@movies/shared/types";
import sortMovies, { SortBy } from "./sorter";

type OrderBy = "asc" | "desc";

export const getMovies = async (
  sortBy: SortBy = "rate",
  orderBy: OrderBy = "desc"
): Promise<Movie[]> => {
  let movies = await fetchMovies();
  movies = sortMovies(movies, sortBy);

  return orderBy === "asc" ? movies : movies.reverse();
};

export const getMovie = async ({
  id = undefined,
  title = undefined,
}: {
  id?: number;
  title?: string;
}): Promise<MovieDetailled> => {
  if (id === undefined && title === undefined)
    throw new Error(ERROR_MESSAGES.EitherIdOrTitleShouldBeProvided);

  return fetchMovie({ id, title });
};

export const getRandomMovie = async (): Promise<Movie | null> => {
  return fetchRandomMovie();
};
