import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { NoMovieFoundError } from "moviecrew-api";
import { detailledMovieMessage } from "../../src/movies/movieService";
import { expectToMatchEmbedMessage } from "../embedTestMethod";
import { movieDetailledWithAllProperties } from "../fixtures/movieDetails";

const spy = jest.spyOn(moviecrewApi, "getMovie");

beforeEach(() => {
  spy.mockReset();
});

const expectMovieDetailToMatch = (response: unknown) => {
  expectToMatchEmbedMessage(
    response,
    new EmbedBuilder()
      .setTitle("🎬 - New Mutants")
      .setURL("https://example.com")
      .setDescription(
        "Crime is on the run as the newly formed Justice League keeps Metropolis safe and this makes evil genius Lex Luthor very unhappy. Together with Black Manta, Sinestro and a gang of ruthless recruits, Lex builds his own league and declares them the Legion of Doom. With this super powered team of terror and a plan to attack the top-secret government site, Area 52, can Lex finally be on the verge of victory? Sound the alarm and get ready for the bricks to fly when Superman, Batman, Wonder Woman and the rest of the Justice League face off against the world's greatest Super-Villains! It's the next all-new original movie from LEGO® and DC Comics.",
      )
      .setColor("#d92f1c")
      .setThumbnail(
        "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
      )
      .setFields([
        { name: "Date Added", value: "20/03/2021", inline: true },
        { name: "Date Viewed", value: "25/02/2021", inline: true },
        { name: "Proposed By", value: "unknown", inline: true },
        { name: "Server Average Rate", value: "2.10", inline: true },
        { name: " ", value: " ", inline: true },
        { name: "People Average Rate", value: "6.14", inline: true },
        { name: "Budget", value: "$67,000,000", inline: true },
        { name: "Revenue", value: "$49,169,594", inline: true },
        { name: "Net value", value: "-$17,830,406", inline: true },
        { name: "------- Rates Detail -------", value: " ", inline: false },
        { name: "Charlotte - Lost Cause", value: "4.00", inline: false },
        { name: "king-chris", value: "2.00", inline: false },
        { name: "Criptics", value: "0.30", inline: false },
      ]),
  );
};

describe("when movie details command is called", () => {
  it("it should return movie details when given title", async () => {
    spy.mockResolvedValue(movieDetailledWithAllProperties);

    const response = await detailledMovieMessage({
      movieTitle: "Justice League 4",
    });

    expectMovieDetailToMatch(response);
  });

  it("should return movie detail when given id", async () => {
    spy.mockResolvedValue(movieDetailledWithAllProperties);

    const response = await detailledMovieMessage({ movieId: 1 });

    expectMovieDetailToMatch(response);
  });

  it("should return an error when movie is not found", async () => {
    spy.mockRejectedValue(new NoMovieFoundError());
    const expected = new EmbedBuilder()
      .setTitle("🎬 - Movie Error")
      .setURL("https://example.com")
      .setDescription("No movie found")
      .setColor("#d92f1c");

    const response = await detailledMovieMessage({ movieId: 1 });

    expectToMatchEmbedMessage(response, expected);
  });
});
