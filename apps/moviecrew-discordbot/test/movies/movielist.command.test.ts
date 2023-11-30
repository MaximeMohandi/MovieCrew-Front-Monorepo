import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { NoMovieFoundError } from "moviecrew-api";
import { movieListMessage } from "../../src/movies/movieService";
import moviesStub from "../fixtures/movies";

const spy = jest.spyOn(moviecrewApi, "getMovies");

beforeEach(() => {
  spy.mockReset();
});

describe("when the movieList command is called", () => {
  it("should return a list of movies embedded in a message", async () => {
    // arrange
    spy.mockResolvedValue(moviesStub);
    const expectedEmbeds = [
      new EmbedBuilder()
        .setTitle("🎬 - Movie List")
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
        .setTitle("🎬 - Movie List")
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
    const res = (await movieListMessage()) as PaginationItem[];

    // assert
    expectedEmbeds.forEach((expectedEmbed, index) => {
      expect(res[index]).toMatchObject({
        embeds: [expectedEmbed],
      });
    });
  });

  it("should return a message with 'No movies found' if the list of movies is empty", async () => {
    // arrange
    spy.mockRejectedValue(new NoMovieFoundError());
    const expectedEmbed = new EmbedBuilder()
      .setTitle("🎬 - Movie Error")
      .setURL("https://example.com")
      .setDescription("No movie found")
      .setColor("#d92f1c");

    // act
    const res = await movieListMessage();

    // assert
    expect(res).toMatchObject([{ embeds: [expectedEmbed] }]);
  });
});

describe("when commmands as options should call the api with the correct sort and order options", () => {
  const testCases = [
    { sortBy: "dateAdded", orderBy: "asc" },
    { sortBy: "dateAdded", orderBy: "desc" },
    { sortBy: "title", orderBy: "asc" },
    { sortBy: "title", orderBy: "desc" },
    { sortBy: undefined, orderBy: undefined },
  ];
  testCases.forEach((testCase) => {
    it(`should call getMovies with sortBy set to '${testCase.sortBy}' and orderBy set to '${testCase.orderBy}`, async () => {
      spy.mockResolvedValue(moviesStub);

      // Act
      await movieListMessage(
        testCase.sortBy as moviecrewApi.SortBy,
        testCase.orderBy as moviecrewApi.OrderBy,
      );

      // Assert
      expect(spy).toHaveBeenCalledWith(testCase.sortBy, testCase.orderBy);
    });
  });
});
