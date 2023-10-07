/* eslint-disable class-methods-use-this */
import { Pagination, PaginationType } from "@discordx/pagination";
import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { movieListMessage } from "./movieService";

@Discord()
export class MovieCommands {
  @Slash({ name: "movielist", description: "List all movies" })
  async movieList(interaction: CommandInteraction): Promise<void> {
    const message = await movieListMessage();

    new Pagination(interaction, message, {
      type: PaginationType.Button,
    }).send();
  }
}
