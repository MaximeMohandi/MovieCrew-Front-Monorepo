/* eslint-disable class-methods-use-this */
import { Pagination, PaginationType } from "@discordx/pagination";
import { EnumChoice } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import type { OrderBy, SortBy } from "moviecrew-api";
import { OrderOptions, SortOptions } from "moviecrew-api";
import {
  detailledMovieMessage,
  movieListMessage,
  toWatchListMessage,
} from "./movieService";

@Discord()
export class MovieCommands {
  @Slash({ name: "movielist", description: "List all movies" })
  async movieList(
    @SlashChoice(...EnumChoice(SortOptions))
    @SlashOption({
      description: "sort list",
      name: "sort-by",
      type: ApplicationCommandOptionType.String,
    })
    sortBy: SortBy,
    @SlashChoice(...EnumChoice(OrderOptions))
    @SlashOption({
      description: "order list",
      name: "order-by",
      type: ApplicationCommandOptionType.String,
    })
    orderBy: OrderBy,
    interaction: CommandInteraction,
  ): Promise<void> {
    const message = await movieListMessage(sortBy, orderBy);

    new Pagination(interaction, message, {
      type: PaginationType.Button,
    }).send();
  }

  @Slash({ name: "towatchlist", description: "List movies to watch" })
  async toWatchList(
    @SlashChoice(
      ...EnumChoice(
        Object.entries(SortOptions)
          .filter(
            (options) =>
              ![SortOptions.VIEWING_DATE, SortOptions.RATE].includes(
                options[1],
              ),
          )
          .reduce(
            (dict, [key, value]) => Object.assign(dict, { [key]: value }),
            {},
          ),
      ),
    )
    @SlashOption({
      description: "sort list",
      name: "sort-by",
      type: ApplicationCommandOptionType.String,
    })
    sortBy: SortBy,
    @SlashChoice(...EnumChoice(OrderOptions))
    @SlashOption({
      description: "order list",
      name: "order-by",
      type: ApplicationCommandOptionType.String,
    })
    orderBy: OrderBy,
    interaction: CommandInteraction,
  ): Promise<void> {
    const message = await toWatchListMessage(sortBy, orderBy);

    new Pagination(interaction, message, {
      type: PaginationType.Button,
    }).send();
  }

  @Slash({
    name: "moviedetails",
    description: "Get movie details",
  })
  async movieDetails(
    @SlashOption({
      description: "movie title",
      name: "title",
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    movieTitle: string,
    interaction: CommandInteraction,
  ): Promise<void> {
    const message = await detailledMovieMessage({ movieTitle });

    interaction.reply(message);
  }
}
