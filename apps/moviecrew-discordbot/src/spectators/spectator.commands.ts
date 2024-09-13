/* eslint-disable class-methods-use-this */
import { Pagination, PaginationType } from "@discordx/pagination";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  User,
} from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { spectatorDetailsMessage } from "./spectatorService";

@Discord()
export class SpectatorCommands {
  @Slash({ name: "spectatordetails", description: "Get spectator details" })
  async spectatorDetails(
    @SlashOption({
      description: "spectator",
      name: "spectator",
      type: ApplicationCommandOptionType.User,
      required: true,
    })
    spectator: User,
    interaction: CommandInteraction,
  ): Promise<void> {
    const message = await spectatorDetailsMessage({
      spectatorId: spectator.id,
    });

    new Pagination(interaction, message, {
      type: PaginationType.Button,
    }).send();
  }
}
