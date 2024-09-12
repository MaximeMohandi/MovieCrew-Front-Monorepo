import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import { spectatorMessage } from "../../src/spectators/spectatorMessage";
import spectatorDetails from "../fixtures/spectatorDetails";

test("create paginated message from spectator details", () => {
  // Arrange
  const expected = [
    new EmbedBuilder()
      .setTitle("🎬 - Maxime")
      .setDescription("movie rated : 11 | average rate : 5.00")
      .setColor("#d92f1c")
      .setFooter({
        text: "1/2",
      })
      .addFields(
        {
          name: "The Shawshank Redemption",
          value: "5.00",
          inline: true,
        },
        {
          name: "The Dark Knight",
          value: "5.00",
          inline: true,
        },
        {
          name: "Forrest Gump",
          value: "5.00",
          inline: true,
        },
        {
          name: "Pulp Fiction",
          value: "5.00",
          inline: true,
        },
        {
          name: "Les Animaux Fantastiques",
          value: "5.00",
          inline: true,
        },
        {
          name: "Aquaman",
          value: "5.00",
          inline: true,
        },
        {
          name: "Deadpool 2",
          value: "5.00",
          inline: true,
        },
        {
          name: "Legally Blonde",
          value: "5.00",
          inline: true,
        },
        {
          name: "Inception",
          value: "5.00",
          inline: true,
        },
        {
          name: "The Matrix",
          value: "5.00",
          inline: true,
        },
      ),
    new EmbedBuilder()
      .setTitle("🎬 - Maxime")
      .setDescription("movie rated : 11 | average rate : 5.00")
      .setColor("#d92f1c")
      .setFooter({
        text: "2/2",
      })
      .addFields({
        name: "The Lord of the Rings: The Fellowship of the Ring",
        value: "5.00",
        inline: true,
      }),
  ];

  // Act
  const result = spectatorMessage(spectatorDetails);

  // Assert
  expect(result).toHaveLength(expected.length);
  expect(result).toBeInstanceOf(Array<PaginationItem>);
  expected.forEach((embed, index) => {
    expect(result[index]).toMatchObject({ embeds: [embed] });
  });
});
