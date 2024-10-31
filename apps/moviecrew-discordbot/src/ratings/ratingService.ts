import { BaseMessageOptions, EmbedBuilder } from "discord.js";
import {
  NoMovieFoundError,
  RateError,
  getMovie,
  rateMovie,
} from "moviecrew-api";

const rateEmbed = (title: string, message: string) => {
  return {
    embeds: [
      new EmbedBuilder()
        .setTitle(`⭐ - ${title}`)
        .setURL("https://example.com")
        .setColor("#d92f1c")
        .setFields({
          name: " ",
          value: message,
        }),
    ],
  };
};

export const rate = async (
  movieTitle: string,
  ratedBy: string,
  rating: number,
): Promise<BaseMessageOptions> => {
  try {
    const { id } = await getMovie({ title: movieTitle });
    await rateMovie(id, ratedBy, rating);
    return rateEmbed(
      `${movieTitle} as been rated !`,
      `${ratedBy} rated it ${rating}/10`,
    );
  } catch (error) {
    if (error instanceof RateError) {
      return rateEmbed(`Rate Error`, error.message);
    }

    if (error instanceof NoMovieFoundError) {
      return rateEmbed(`Rate Error`, "Movie not found");
    }

    throw error;
  }
};
