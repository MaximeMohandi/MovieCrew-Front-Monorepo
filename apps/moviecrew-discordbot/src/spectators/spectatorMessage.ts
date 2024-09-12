import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import { Spectator } from "moviecrew-api";
import { chunkList } from "../shared/listTransformations";

const averageRate = (rates: number[]): number =>
  rates.reduce((sum, rate) => sum + rate, 0) / rates.length;

export const spectatorMessage = (spectator: Spectator): PaginationItem[] => {
  const pages = chunkList(spectator.rates);
  return pages.map((page, index) => {
    const message = new EmbedBuilder()
      .setTitle(`🎬 - ${spectator.spectator.name}`)
      .setDescription(
        `movie rated : ${spectator.rates.length} | average rate : ${averageRate(
          spectator.rates.map((rate) => rate.rate),
        ).toFixed(2)}`,
      )
      .setColor("#d92f1c")
      .setFooter({
        text: `${index + 1}/${pages.length}`,
      });

    page.forEach((rate) => {
      message.addFields({
        name: rate.ratedMovie.title,
        value: rate.rate.toFixed(2),
        inline: true,
      });
    });

    return { embeds: [message] };
  });
};
