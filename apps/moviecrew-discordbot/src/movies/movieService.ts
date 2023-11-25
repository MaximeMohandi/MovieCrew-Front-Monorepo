import { PaginationItem } from "@discordx/pagination";
import {
  MovieError,
  getMovies,
  getUnseenMovies,
  type OrderBy,
  type SortBy,
} from "moviecrew-api";
import { movieErrorEmbed, moviesPaginated } from "./movieMessage";

export const movieListMessage = async (
  sortOption?: SortBy,
  orderOption?: OrderBy,
): Promise<PaginationItem[]> => {
  try {
    const movies = await getMovies(sortOption, orderOption);

    return moviesPaginated("Movie List", movies);
  } catch (error) {
    if (error instanceof MovieError) {
      return [movieErrorEmbed(error.message)];
    }

    throw error;
  }
};

export const toWatchListMessage = async (
  sortOption?: SortBy,
  orderOption?: OrderBy,
): Promise<PaginationItem[]> => {
  try {
    const movies = await getUnseenMovies(sortOption, orderOption);

    return moviesPaginated("To Watch List", movies);
  } catch (error) {
    if (error instanceof MovieError) {
      return [movieErrorEmbed(error.message)];
    }

    throw error;
  }
};
