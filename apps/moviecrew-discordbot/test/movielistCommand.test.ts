/*
 * the list of movies should be limited to 10 per page
 * the footer of the embed should be the page number
 * the embed should have buttons for next, previous , first and last page
 * when clicking the next button, the next page should be displayed
 * when clicking the previous button, the previous page should be displayed
 * when clicking the first button, the first page should be displayed
 * when clicking the last button, the last page should be displayed
 * if the list of movies is empty, the embed should say "No movies found"
 * if there is only one page, the embed should not have any buttons
 * if error occurs, the embed should say "An error occurred"
 * --------------------
 * should be sorted by title when command as the option "sort=title"
 * should be sorted by date when command as the option "sort=viewingDate"
 * should be sorted by date when command as the option "sort=dateAdded"
 * should be sorted by rate when command as the option "sort=rate"
 * should sort descending or ascending if command as the option "order=asc" or "order=desc"
 */
import { CommandInteraction, EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { MovieCommands } from "../src/commands/movieCommands";
import movies from "./fixtures/movies";

describe("when the command is called without options", () => {
  const mockInteraction = {
    reply: jest.fn(),
  } as unknown as CommandInteraction;

  it("should return a list of movies embedded in a message", async () => {
    // arrange
    const movieCommands = new MovieCommands();
    jest.spyOn(moviecrewApi, "getMovies").mockResolvedValue(movies);
    const expectedEmbed = new EmbedBuilder()
      .setTitle("🎬 - Movie List")
      .setURL("https://example.com")
      .setDescription("113 found")
      .addFields(
        {
          name: "The Shawshank Redemption - 9.30",
          value: "added: 10/07/2021 | seen: 03/11/2021",
          inline: false,
        },
        {
          name: "The Dark Knight - 9.00",
          value: "added: 15/01/2022 | seen: 25/03/2022",
          inline: false,
        },
        {
          name: "Forrest Gump - 8.80",
          value: "added: 05/03/2022 | seen: 19/04/2022",
          inline: false,
        },
        {
          name: "Pulp Fiction - 8.70",
          value: "added: 18/12/2021 | seen: 12/02/2022",
          inline: false,
        },
        {
          name: "Les Animaux Fantastiques - 5.75",
          value: "added: 16/04/2022 | seen: 29/04/2022",
          inline: false,
        },
        {
          name: "Aquaman - 5.64",
          value: "added: 20/03/2021 | seen: 23/01/2022",
          inline: false,
        },
        {
          name: "Deadpool 2 - 5.62",
          value: "added: 20/03/2021 | seen: 08/03/2021",
          inline: false,
        },
        {
          name: "Legally Blonde - 5.56",
          value: "added: 29/04/2022 | seen: 12/06/2022",
          inline: false,
        },
        {
          name: "Inception - 4.90",
          value: "added: 07/08/2022 | seen: 20/09/2022",
          inline: false,
        },
        {
          name: "Le Roi Arthur : La Légende d'Excalibur",
          value: "added: 14/10/2021 | seen: not yet",
          inline: false,
        },
        {
          name: "Interstellar",
          value: "added: 12/05/2023 | seen: not yet",
          inline: false,
        },
      )
      .setColor("#d92f1c")
      .setFooter({
        text: "1/113",
      });

    // act
    await movieCommands.movieList(mockInteraction);

    // assert
    expect(mockInteraction.reply).toHaveBeenCalledWith({
      embeds: [expectedEmbed],
    });
  });
});
