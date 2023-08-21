import {
  fetchMovie,
  fetchMovies,
  fetchRandomMovie,
  postNewMovie,
} from "@movies/api";
import { ERROR_MESSAGES, UnseenMoviesNotFound } from "@movies/errors";
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

export const getUnseenMovies = async (
  sortBy: SortBy = "dateAdded",
  orderBy: OrderBy = "desc"
): Promise<Movie[]> => {
  if (sortBy === "viewingDate")
    throw new TypeError(ERROR_MESSAGES.SortByViewingDateNotPossible);

  if (sortBy === "rate")
    throw new TypeError(ERROR_MESSAGES.SortByRateNotPossible);

  const movies = await getMovies(sortBy, orderBy);

  if (movies.length === 0) throw new UnseenMoviesNotFound();

  return movies.filter((movie) => !movie.viewingDate);
};
export const addMovie = async (
  title: string,
  proposedBy: string
): Promise<Movie> => {
  const idMovieAdd = await postNewMovie(title, proposedBy);
  return getMovie({ id: idMovieAdd });
};
