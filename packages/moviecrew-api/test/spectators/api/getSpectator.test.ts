import { rest } from "msw";
import {
  NoSpectatorFoundError,
  NotASpectatorError,
  SpectatorError,
} from "../../../src/spectators";
import { getSpectators } from "../../../src/spectators/api";
import { GET_SPECTATORS_DETAILS_ENDPOINT } from "../../../src/spectators/api/endpoints";
import server, { interceptUrl, setupTest } from "../../setupApiTest";
import defaultSpectatorResponse from "../fixtures/defaultSpectatorWithRate.json";

setupTest();

describe("get spectator", () => {
  it("should return a spectator", async () => {
    server.use(
      rest.get(
        interceptUrl(GET_SPECTATORS_DETAILS_ENDPOINT("123456789")),
        (req, res, ctx) => {
          return res(ctx.json(defaultSpectatorResponse));
        },
      ),
    );
    const spectator = await getSpectators("123456789");
    expect(spectator).toEqual(defaultSpectatorResponse);
  });

  it("should throw error when no spectator found", async () => {
    server.use(
      rest.get(
        interceptUrl(GET_SPECTATORS_DETAILS_ENDPOINT("123456789")),
        (req, res, ctx) => {
          return res(ctx.status(404));
        },
      ),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new NoSpectatorFoundError(),
    );
  });

  it("should throw error when user found but not a spectator", async () => {
    server.use(
      rest.get(
        interceptUrl(GET_SPECTATORS_DETAILS_ENDPOINT("123456789")),
        (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({ spectator: null }));
        },
      ),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new NotASpectatorError(),
    );
  });

  it("should throw generic fetch spectator error if error", async () => {
    server.use(
      rest.get(
        interceptUrl(GET_SPECTATORS_DETAILS_ENDPOINT("123456789")),
        (req, res, ctx) => {
          return res(ctx.status(500));
        },
      ),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new SpectatorError(),
    );
  });
});
