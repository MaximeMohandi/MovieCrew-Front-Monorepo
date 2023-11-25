/* eslint-disable class-methods-use-this */
import { Pagination, PaginationType } from "@discordx/pagination";
import { EnumChoice } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import type { OrderBy, SortBy } from "moviecrew-api";
import { OrderOptions, SortOptions } from "moviecrew-api";
import { movieListMessage } from "./movieService";

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
}
