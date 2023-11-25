import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import { moviesPaginated } from "../src/movies/movieMessage";
import movieStub from "./fixtures/movies";

test("create paginated message from movie list", () => {
  const expectedEmbeds = [
    new EmbedBuilder()
      .setTitle("🎬 - title")
      .setURL("https://example.com")
      .setDescription("11 found")
      .setColor("#d92f1c")
      .setFooter({
        text: "1/2",
      })
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
      ),
    new EmbedBuilder()
      .setTitle("🎬 - title")
      .setURL("https://example.com")
      .setDescription("11 found")
      .setColor("#d92f1c")
      .setFooter({
        text: "2/2",
      })
      .addFields({
        name: "Interstellar",
        value: "added: 12/05/2023 | seen: not yet",
        inline: false,
      }),
  ];

  // act
  const res = moviesPaginated("title", movieStub);

  // assert
  expect(res).toHaveLength(expectedEmbeds.length);
  expect(res).toBeInstanceOf(Array<PaginationItem>);
  expectedEmbeds.forEach((expectedEmbed, index) => {
    expect(res[index]).toMatchObject({ embeds: [expectedEmbed] });
  });
});
