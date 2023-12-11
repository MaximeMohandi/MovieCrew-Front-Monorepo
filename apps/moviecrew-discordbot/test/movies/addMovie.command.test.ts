import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { addMovieToWatchList } from "../../src/movies/movieService";
import { expectToMatchEmbedMessage } from "../embedTestMethod";

const spy = jest.spyOn(moviecrewApi, "addMovie");

beforeEach(() => {
  spy.mockReset();
});

describe("when calling addMovie command", () => {
  it("should pass the correct arguments to the service", async () => {
    spy.mockResolvedValue({
      id: 1,
      title: "New Mutants",
      poster:
        "https://static.wikia.nocookie.net/marveldatabase/images/2/2f/The_New_Mutants_%2528film%2529_poster_003.jpg",
      description:
        "Crime is on the run as the newly formed Justice League keeps Metropolis safe and this makes evil genius Lex Luthor very unhappy. Together with Black Manta, Sinestro and a gang of ruthless recruits, Lex builds his own league and declares them the Legion of Doom. With this super powered team of terror and a plan to attack the top-secret government site, Area 52, can Lex finally be on the verge of victory? Sound the alarm and get ready for the bricks to fly when Superman, Batman, Wonder Woman and the rest of the Justice League face off against the world's greatest Super-Villains! It's the next all-new original movie from LEGO® and DC Comics.",
      dateAdded: new Date("2021-03-20T15:57:35"),
      viewingDate: null,
      averageRate: null,
    });

    await addMovieToWatchList("movieName", "222222223");

    expect(moviecrewApi.addMovie).toHaveBeenCalledWith(
      "movieName",
      "222222223",
    );
  });

  it("should return error message added movie not found", async () => {
    spy.mockRejectedValue(new moviecrewApi.AddMovieError());

    const expected = new EmbedBuilder()
      .setTitle("🎬 - Movie Error")
      .setURL("https://example.com")
      .setDescription("Failed to add movie")
      .setColor("#d92f1c");

    const result = await addMovieToWatchList("movieName", "222222223");

    expectToMatchEmbedMessage(result, expected);
  });
});
