import { fetchMovies } from "@movies/api";
import type { Movie } from "@movies/shared/types";
import sortMovies, { SortBy } from "./sorter";
import { NoMovieFoundError } from "@movies/errors";

type OrderBy = "asc" | "desc";

export const getMovies = async (
  sortBy: SortBy = "rate",
  orderBy: OrderBy = "desc"
): Promise<Movie[]> => {
  try {
    let movies = await fetchMovies();
    movies = sortMovies(movies, sortBy);

    return orderBy === "asc" ? movies : movies.reverse();
  } catch (error: unknown) {
    if (error instanceof NoMovieFoundError) {
      return [];
    } else {
      throw error;
    }
  }
};
