import { EmbedBuilder } from "discord.js";
import * as moviecrewApi from "moviecrew-api";
import { NoSpectatorFoundError } from "moviecrew-api";
import { spectatorDetailsMessage } from "../../src/spectators/spectatorService";
import { expectToMatchEmbedMessage } from "../embedTestMethod";
import spectatorDetails from "../fixtures/spectatorDetails";

const spy = jest.spyOn(moviecrewApi, "fetchSpectator");

beforeEach(() => {
  spy.mockReset();
});

describe("when spectator details command is called", () => {
  it("should return spectator details when given it's id", async () => {
    // Arrange
    spy.mockResolvedValue(spectatorDetails);
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
            inline: false,
          },
          {
            name: "The Dark Knight",
            value: "5.00",
            inline: false,
          },
          {
            name: "Forrest Gump",
            value: "5.00",
            inline: false,
          },
          {
            name: "Pulp Fiction",
            value: "5.00",
            inline: false,
          },
          {
            name: "Les Animaux Fantastiques",
            value: "5.00",
            inline: false,
          },
          {
            name: "Aquaman",
            value: "5.00",
            inline: false,
          },
          {
            name: "Deadpool 2",
            value: "5.00",
            inline: false,
          },
          {
            name: "Legally Blonde",
            value: "5.00",
            inline: false,
          },
          {
            name: "Inception",
            value: "5.00",
            inline: false,
          },
          {
            name: "The Matrix",
            value: "5.00",
            inline: false,
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
          inline: false,
        }),
    ];
    // Act
    const response = await spectatorDetailsMessage({
      spectatorId: "222222223",
    });
    // Assert
    expected.forEach((embed, index) => {
      expectToMatchEmbedMessage(response[index], embed);
    });
  });

  it('should return a message with "Spectator not found" when spectator is not found', async () => {
    // Arrange
    spy.mockRejectedValue(new NoSpectatorFoundError());
    const expected = new EmbedBuilder()
      .setTitle("🎬 - Spectator error")
      .setDescription("No spectator found for this user")
      .setColor("#d92f1c");
    // Act
    const response = await spectatorDetailsMessage({
      spectatorId: "0",
    });
    // Assert
    expectToMatchEmbedMessage(response[0], expected);
  });
});
