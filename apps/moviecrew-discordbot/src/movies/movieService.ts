import { PaginationItem } from "@discordx/pagination";
import {
  MovieError,
  getMovies,
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
