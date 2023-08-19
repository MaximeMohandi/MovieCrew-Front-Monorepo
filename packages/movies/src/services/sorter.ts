import { Movie } from "@movies/shared/types";

enum SortOptions {
  RATE = "rate",
  DATE_ADDED = "dateAdded",
  TITLE = "title",
  VIEWING_DATE = "viewingDate",
}

export type SortBy = `${SortOptions}`; // "map sort options to string literal type"

const sortMovies = (movies: Movie[], sortBy: SortBy): Movie[] => {
  if (movies && movies.length === 0) return [];

  if (sortBy === SortOptions.DATE_ADDED) {
    movies = movies.sort((a, b) => byDate(a.dateAdded, b.dateAdded));
  }

  if (sortBy === SortOptions.TITLE) {
    movies = movies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === SortOptions.VIEWING_DATE) {
    movies = movies.sort((a, b) => byDate(a.viewingDate, b.viewingDate));
  }

  if (sortBy === SortOptions.RATE) {
    movies = movies.sort(
      (a, b) => (a.averageRate ?? -1) - (b.averageRate ?? -1)
    );
  }

  return movies;
};

const byDate = (a: Date | string | null, b: Date | string | null) => {
  return (a ? new Date(a).getTime() : -1) - (b ? new Date(b).getTime() : -1);
};

export default sortMovies;
