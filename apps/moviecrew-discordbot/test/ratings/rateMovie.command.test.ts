import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { rate } from "../../src/ratings/ratingService";
import { expectToMatchEmbedMessage } from "../embedTestMethod";
import { movieDetailledWithAllProperties } from "../fixtures/movieDetails";

const spyRateMovie = jest.spyOn(moviecrewApi, "rateMovie");
const spyGetMovie = jest.spyOn(moviecrewApi, "getMovie");

beforeEach(() => {
  spyRateMovie.mockReset();
  spyGetMovie.mockReset();
});

describe("when rating a movie with rateMovie command", () => {
  it("should pass the id and the rate to the service", async () => {
    spyGetMovie.mockResolvedValue(movieDetailledWithAllProperties);
    spyRateMovie.mockResolvedValue("1");

    await rate("movieName", "222222223", 5.0);

    expect(moviecrewApi.rateMovie).toHaveBeenCalledWith(1, "222222223", 5.0);
  });

  it("should return an embed message with the new rate", async () => {
    spyGetMovie.mockResolvedValue(movieDetailledWithAllProperties);
    spyRateMovie.mockResolvedValue("1");
    const expected = new EmbedBuilder()
      .setTitle("⭐ - movieName as been rated !")
      .setURL("https://example.com")
      .setColor("#d92f1c")
      .setFields([{ name: " ", value: "222222223 rated it 5.1/10" }]);

    const result = await rate("movieName", "222222223", 5.1);

    expectToMatchEmbedMessage(result, expected);
  });

  it("should return an embed message with the error message when the movie is not found", async () => {
    spyGetMovie.mockRejectedValue(new moviecrewApi.NoMovieFoundError());
    const expected = new EmbedBuilder()
      .setTitle("⭐ - Rate Error")
      .setURL("https://example.com")
      .setColor("#d92f1c")
      .setFields([{ name: " ", value: "Movie not found" }]);

    const result = await rate("movieName", "222222223", 5.1);

    expectToMatchEmbedMessage(result, expected);
  });
});
