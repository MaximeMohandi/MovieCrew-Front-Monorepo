import { PaginationItem } from "@discordx/pagination";
import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import { Movie, MovieDetailled } from "moviecrew-api";

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

const addMovieEmbedRateDetail = (
  movieDetails: EmbedBuilder,
  movie: MovieDetailled,
): EmbedBuilder => {
  const { movieRates } = movie;
  if (movieRates && movieRates.length > 0) {
    movieDetails.addFields([
      {
        name: "------- Rates Detail -------",
        value: " ", // Set value to a non-empty string
        inline: false,
      },
    ]);
    movieRates
      .sort((a, b) => b.rate - a.rate)
      .forEach((movieRate) => {
        movieDetails.addFields({
          name: movieRate.ratedBy.name,
          value: movieRate.rate.toFixed(2).toString(),
          inline: false,
        });
      });
  }
  return movieDetails;
};

const toDollarString = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .toString();
};

export const movieEmbed = (
  movie: Movie | MovieDetailled,
): BaseMessageOptions => {
  const embeddedMovie = defaultMovieEmbed(
    movie.title,
    movie.description,
  ).setThumbnail(movie.poster);

  if ("budget" in movie) {
    const {
      dateAdded,
      viewingDate,
      proposedBy,
      revenue,
      budget,
      peopleAverageRate,
      averageRate,
    } = movie;
    const detailledEmbed = embeddedMovie.setFields(
      {
        name: "Date Added",
        value: formatDate(dateAdded),
        inline: true,
      },
      {
        name: "Date Viewed",
        value: viewingDate ? formatDate(viewingDate) : "not yet",
        inline: true,
      },
      {
        name: "Proposed By",
        value: proposedBy ? proposedBy.name : "unknown",
        inline: true,
      },
      {
        name: "Server Average Rate",
        value: averageRate ? averageRate.toFixed(2).toString() : "-",
        inline: true,
      },
      // blanck line to not break the layout
      {
        name: " ",
        value: " ",
        inline: true,
      },
      {
        name: "People Average Rate",
        value: peopleAverageRate ? peopleAverageRate.toFixed(2) : "-",
        inline: true,
      },
      {
        name: "Budget",
        value: budget ? toDollarString(budget) : "-",
        inline: true,
      },
      {
        name: "Revenue",
        value: revenue ? toDollarString(revenue) : "-",
        inline: true,
      },
      {
        name: "Net value",
        value: toDollarString((revenue ?? 0) - (budget ?? 0)),
        inline: true,
      },
    );

    addMovieEmbedRateDetail(detailledEmbed, movie);

    return { embeds: [detailledEmbed] };
  }

  return { embeds: [embeddedMovie] };
};
