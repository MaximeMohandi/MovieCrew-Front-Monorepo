import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Discord } from "discordx";
import { Movie, getMovies } from "moviecrew-api";

@Discord()
export class MovieCommands {
  async movieList(interraction: CommandInteraction): Promise<void> {
    const movies = await getMovies();
    const message = new EmbedBuilder()
      .setTitle("🎬 - Movie List")
      .setURL("https://example.com")
      .setDescription("113 found")
      .setColor("#d92f1c")
      .setFooter({
        text: "1/113",
      });

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

    await interraction.reply({ embeds: [message] });
  }
}
