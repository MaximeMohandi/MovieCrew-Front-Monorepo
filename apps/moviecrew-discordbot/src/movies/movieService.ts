import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder, type BaseMessageOptions } from "discord.js";
import {
  MovieError,
  getMovies,
  type Movie,
  type OrderBy,
  type SortBy,
} from "moviecrew-api";

const chunkList = <T>(list: T[]): T[][] => {
  const chunks = [];
  for (let i = 0; i < list.length; i += 10) {
    chunks.push(list.slice(i, i + 10));
  }
  return chunks;
};

const movieMessageBuilder = (
  description: string,
  footerText: string,
  movies: Movie[] = [],
): BaseMessageOptions => {
  const message = new EmbedBuilder()
    .setTitle("🎬 - Movie List")
    .setURL("https://example.com")
    .setDescription(description)
    .setColor("#d92f1c")
    .setFooter({
      text: footerText,
    });

  if (!movies || movies.length === 0) return { embeds: [message] };

  movies.forEach((movie: Movie) => {
    const { title, averageRate, dateAdded, viewingDate } = movie;
    message.addFields({
      name: `${title}${averageRate ? ` - ${averageRate.toFixed(2)}` : ""}`,
      value: `added: ${dateAdded.toLocaleDateString()} | seen: ${
        viewingDate ? viewingDate.toLocaleDateString() : "not yet"
      }`,
      inline: false,
    });
  });

  return { embeds: [message] };
};

export const movieListMessage = async (
  sortOption?: SortBy,
  orderOption?: OrderBy,
): Promise<PaginationItem[]> => {
  try {
    const movies = await getMovies(sortOption, orderOption);

    const moviesChunks = chunkList(movies);

    const pages = moviesChunks.map((chunk, index): PaginationItem => {
      return movieMessageBuilder(
        `${movies.length} found`,
        `${index + 1}/${moviesChunks.length}`,
        chunk,
      );
    });

    return pages;
  } catch (error) {
    if (error instanceof MovieError) {
      return [movieMessageBuilder(error.message, "0")];
    }

    throw error;
  }
};
