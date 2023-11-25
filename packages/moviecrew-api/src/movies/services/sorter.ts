import { Movie } from "../shared/types";

export enum SortOptions {
  RATE = "rate",
  DATE_ADDED = "dateAdded",
  TITLE = "title",
  VIEWING_DATE = "viewingDate",
}

export type SortBy = `${SortOptions}`; // "map sort options to string literal type"

const byDate = (a: Date | string | null, b: Date | string | null) => {
  return (a ? new Date(a).getTime() : -1) - (b ? new Date(b).getTime() : -1);
};

const sortMovies = (movies: Movie[], sortBy: SortBy): Movie[] => {
  if (movies && movies.length === 0) return [];
  let sortedMovies = movies;

  if (sortBy === SortOptions.DATE_ADDED) {
    sortedMovies = movies.sort((a, b) => byDate(a.dateAdded, b.dateAdded));
  }

  if (sortBy === SortOptions.TITLE) {
    sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === SortOptions.VIEWING_DATE) {
    sortedMovies = movies.sort((a, b) => byDate(a.viewingDate, b.viewingDate));
  }

  if (sortBy === SortOptions.RATE) {
    sortedMovies = movies.sort(
      (a, b) => (a.averageRate ?? -1) - (b.averageRate ?? -1),
    );
  }

  return sortedMovies;
};

export default sortMovies;
