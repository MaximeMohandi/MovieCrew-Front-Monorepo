import { fetchMovie, fetchMovies } from "@movies/api";
import type { Movie, MovieDetailled } from "@movies/shared/types";
import sortMovies, { SortBy } from "./sorter";
import { ERROR_MESSAGES, NoMovieFoundError } from "@movies/errors";

type OrderBy = "asc" | "desc";

export const getMovies = async (
  sortBy: SortBy = "rate",
  orderBy: OrderBy = "desc"
): Promise<Movie[]> => {
  try {
    let movies = await fetchMovies();
    movies = sortMovies(movies, sortBy);

    return orderBy === "asc" ? movies : movies.reverse();
  } catch (error) {
    if (error instanceof NoMovieFoundError) {
      return [];
    } else {
      throw error;
    }
  }
};

export const getMovie = async ({
  id = undefined,
  title = undefined,
}: {
  id?: number;
  title?: string;
}): Promise<MovieDetailled | {}> => {
  if (id === undefined && title === undefined)
    throw new Error(ERROR_MESSAGES.EitherIdOrTitleShouldBeProvided);

  try {
    return await fetchMovie({ id, title });
  } catch (error) {
    if (error instanceof NoMovieFoundError) {
      return {};
    } else {
      throw error;
    }
  }
};
