import { rest } from "msw";
import server, { setupTest } from "../../setupApiTest";
import defaultSpectatorResponse from "../fixtures/defaultSpectatorWithRate.json";

setupTest();

describe("get spectator", () => {
  it("should return a spectator", () => {
    server.use(
      rest.get("api/specators/123456789/details", (req, res, ctx) => {
        return res(ctx.json(defaultSpectatorResponse));
      }),
    );
    const spectator = {};
    expect(spectator).toEqual(defaultSpectatorResponse);
  });
});
