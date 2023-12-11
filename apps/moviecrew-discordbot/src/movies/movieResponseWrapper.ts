import { PaginationItem } from "@discordx/pagination";
import { BaseMessageOptions } from "discord.js";
import { Movie, MovieDetailled, MovieError } from "moviecrew-api";
import { movieEmbed, movieErrorEmbed, moviesPaginated } from "./movieMessage";

export const movieListOrError = async (
  movieFetcher: () => Promise<Movie[]>,
  listTitle: string,
): Promise<PaginationItem[]> => {
  try {
    const movies = await movieFetcher();
    return moviesPaginated(listTitle, movies);
  } catch (error) {
    if (error instanceof MovieError) {
      return [movieErrorEmbed(error.message)];
    }
    throw error;
  }
};
export const movieOrError = async (
  movieFetcher: () => Promise<Movie | MovieDetailled>,
): Promise<BaseMessageOptions> => {
  try {
    const movie = await movieFetcher();

    return movieEmbed(movie);
  } catch (error) {
    if (error instanceof MovieError) {
      return movieErrorEmbed(error.message);
    }

    throw error;
  }
};
