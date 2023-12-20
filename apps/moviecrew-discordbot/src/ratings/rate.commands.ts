/* eslint-disable class-methods-use-this */
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import { rate } from "./ratingService";

@Discord()
export class RateCommands {
  @Slash({ name: "rate", description: "Rate a movie" })
  async rate(
    @SlashOption({
      description: "Movie title",
      name: "title",
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    title: string,
    @SlashOption({
      description: "Rating",
      name: "rating",
      type: ApplicationCommandOptionType.Number,
      required: true,
    })
    rating: number,
    interaction: CommandInteraction,
  ): Promise<void> {
    const message = await rate(title, interaction.user.id, rating);

    interaction.reply(message);
  }
}
