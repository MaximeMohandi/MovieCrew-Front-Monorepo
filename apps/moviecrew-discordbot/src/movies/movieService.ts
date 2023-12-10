import { PaginationItem } from "@discordx/pagination";
import { BaseMessageOptions } from "discord.js";
import {
  MovieError,
  UnseenMoviesNotFound,
  getMovie,
  getMovies,
  getRandomMovie,
  getUnseenMovies,
  type OrderBy,
  type SortBy,
} from "moviecrew-api";
import { movieEmbed, movieErrorEmbed, moviesPaginated } from "./movieMessage";

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

export const detailledMovieMessage = async ({
  movieId = undefined,
  movieTitle = undefined,
}: {
  movieId?: number;
  movieTitle?: string;
}): Promise<BaseMessageOptions> => {
  try {
    const movie = await getMovie({ title: movieTitle, id: movieId });

    return movieEmbed(movie);
  } catch (error) {
    if (error instanceof MovieError) {
      return movieErrorEmbed(error.message);
    }

    throw error;
  }
};

export const randomMovieMessage = async (): Promise<BaseMessageOptions> => {
  try {
    const movie = await getRandomMovie();

    if (!movie || movie === null) {
      throw new UnseenMoviesNotFound();
    }
    return movieEmbed(movie);
  } catch (error) {
    if (error instanceof MovieError) {
      return movieErrorEmbed(error.message);
    }

    throw error;
  }
};
