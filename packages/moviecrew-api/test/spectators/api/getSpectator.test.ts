import { getSpectators } from "@spectators/api";
import { GET_SPECTATORS_DETAILS } from "@spectators/api/endpoints";
import {
  NoSpectatorFoundError,
  NotASpectatorError,
  SpectatorError,
} from "@spectators/errors";
import { rest } from "msw";
import server, { setupTest } from "../../setupApiTest";
import defaultSpectatorResponse from "../fixtures/defaultSpectatorWithRate.json";

setupTest();

describe("get spectator", () => {
  it("should return a spectator", async () => {
    server.use(
      rest.get(GET_SPECTATORS_DETAILS("123456789"), (req, res, ctx) => {
        return res(ctx.json(defaultSpectatorResponse));
      }),
    );
    const spectator = await getSpectators("123456789");
    expect(spectator).toEqual(defaultSpectatorResponse);
  });

  it("should throw error when no spectator found", async () => {
    server.use(
      rest.get(GET_SPECTATORS_DETAILS("123456789"), (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new NoSpectatorFoundError(),
    );
  });

  it("should throw error when user found but not a spectator", async () => {
    server.use(
      rest.get(GET_SPECTATORS_DETAILS("123456789"), (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ spectator: null }));
      }),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new NotASpectatorError(),
    );
  });

  it("should throw generic fetch spectator error if error", async () => {
    server.use(
      rest.get(GET_SPECTATORS_DETAILS("123456789"), (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(getSpectators("123456789")).rejects.toThrow(
      new SpectatorError(),
    );
  });
});
