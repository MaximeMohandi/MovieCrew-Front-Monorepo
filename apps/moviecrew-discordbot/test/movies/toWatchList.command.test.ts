import { PaginationItem } from "@discordx/pagination";
import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { toWatchListMessage } from "../../src/movies/movieService";
import moviesStub from "../fixtures/unseenMovies";

const spy = jest.spyOn(moviecrewApi, "getUnseenMovies");

beforeEach(() => {
  spy.mockReset();
});

describe("when the towatch command is called", () => {
  it("should return a list of movies embedded in a message", async () => {
    // arrange
    spy.mockResolvedValue(moviesStub);
    const expectedEmbeds = [
      new EmbedBuilder()
        .setTitle("🎬 - To Watch List")
        .setURL("https://example.com")
        .setDescription("2 found")
        .setColor("#d92f1c")
        .setFooter({
          text: "1/1",
        })
        .addFields(
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
        ),
    ];

    // act
    const res = (await toWatchListMessage()) as PaginationItem[];

    // assert
    expectedEmbeds.forEach((expectedEmbed, index) => {
      expect(res[index]).toMatchObject({
        embeds: [expectedEmbed],
      });
    });
  });

  it("should return a message with 'Unseen Movie not found' if the list of movies is empty", async () => {
    // arrange
    spy.mockRejectedValue(new moviecrewApi.UnseenMoviesNotFound());
    const expectedEmbed = new EmbedBuilder()
      .setTitle("🎬 - Movie Error")
      .setURL("https://example.com")
      .setDescription("No unseen movies found")
      .setColor("#d92f1c");

    // act
    const res = await toWatchListMessage();

    // assert
    expect(res).toMatchObject([{ embeds: [expectedEmbed] }]);
  });
});

describe("when commands as options should call the api with the correct sort and order options", () => {
  const testCases = [
    { sortBy: "rate", orderBy: "asc" },
    { sortBy: "rate", orderBy: "desc" },
    { sortBy: "dateAdded", orderBy: "asc" },
    { sortBy: "dateAdded", orderBy: "desc" },
    { sortBy: "viewingDate", orderBy: "asc" },
    { sortBy: "viewingDate", orderBy: "desc" },
    { sortBy: "title", orderBy: "asc" },
    { sortBy: "title", orderBy: "desc" },
    { sortBy: undefined, orderBy: undefined },
  ];

  test.each(testCases)(
    "should call the api with the correct sort and order options",
    async ({ sortBy, orderBy }) => {
      // arrange
      spy.mockResolvedValue(moviesStub);

      // act
      await toWatchListMessage(
        sortBy as moviecrewApi.SortBy,
        orderBy as moviecrewApi.OrderBy,
      );

      // assert
      expect(spy).toHaveBeenCalledWith(sortBy, orderBy);
    },
  );
});
