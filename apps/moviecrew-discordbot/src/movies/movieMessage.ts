import { PaginationItem } from "@discordx/pagination";
import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import { Movie } from "moviecrew-api";

const chunkList = <T>(list: T[]): T[][] => {
  const chunks = [];
  for (let i = 0; i < list.length; i += 10) {
    chunks.push(list.slice(i, i + 10));
  }
  return chunks;
};

const formatDate: (date: Date) => string = (date: Date): string =>
  date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const defaultMovieEmbed = (title: string, description: string): EmbedBuilder =>
  new EmbedBuilder()
    .setTitle(`🎬 - ${title}`)
    .setURL("https://example.com")
    .setDescription(description)
    .setColor("#d92f1c");

const moviesToEmbedList = (
  messageTitle: string,
  nbMovieFound: number,
  footerText: string,
  movies: Movie[],
): BaseMessageOptions => {
  const message = defaultMovieEmbed(
    messageTitle,
    `${nbMovieFound} found`,
  ).setFooter({
    text: footerText,
  });

  movies.forEach((movie: Movie) => {
    const { title, averageRate, dateAdded, viewingDate } = movie;
    message.addFields({
      name: `${title}${averageRate ? ` - ${averageRate.toFixed(2)}` : ""}`,
      value: `added: ${formatDate(dateAdded)} | seen: ${
        viewingDate ? formatDate(viewingDate) : "not yet"
      }`,
      inline: false,
    });
  });

  return { embeds: [message] };
};

export const moviesPaginated = (
  messageTitle: string,
  movies: Movie[] = [],
): PaginationItem[] => {
  const moviesChunks = chunkList(movies);

  return moviesChunks.map((chunk, index): PaginationItem => {
    return moviesToEmbedList(
      messageTitle,
      movies.length,
      `${index + 1}/${moviesChunks.length}`,
      chunk,
    );
  });
};

export const movieErrorEmbed = (errorMessage: string): BaseMessageOptions => {
  return { embeds: [defaultMovieEmbed("Movie Error", errorMessage)] };
};
