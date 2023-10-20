import { rest } from "msw";
import { AuthenticationError, InvalidCredentialError } from "../../../src/auth";
import { getToken } from "../../../src/auth/api";
import { GET_TOKEN_ENDPOINT } from "../../../src/auth/api/endpoints";
import server, { setupTest } from "../../setupApiTest";

setupTest();

describe("fetching token", () => {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
  it("should return a token with an expiration date", async () => {
    server.use(
      rest.get(GET_TOKEN_ENDPOINT, (req, res, ctx) => {
        const secret = req.headers.get("Authorization")?.split(" ")[1];
        const clientId = req.url.searchParams.get("clientId");

        if (clientId === "3" && secret === "secret") {
          return res(
            ctx.json({
              token: "fake.token.key",
              expirationDate: Date.now() + 1000 * 60 * 60 * 24 * 7,
            }),
          );
        }

        return req.passthrough();
      }),
    );

    const { token, expirationDate } = await getToken(3, "secret");

    expect(token).toMatch(jwtRegex);
    expect(expirationDate).toBeGreaterThan(Date.now());
  });

  it("should throw invalid credentials error if received a forbidden error", async () => {
    server.use(
      rest.get(GET_TOKEN_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );

    await expect(getToken(3, "wrong secret")).rejects.toThrow(
      new InvalidCredentialError(),
    );
  });

  it("should throw authentication failed error if received an unexpected error", async () => {
    server.use(
      rest.get(GET_TOKEN_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(getToken(3, "wrong secret")).rejects.toThrow(
      new AuthenticationError(),
    );
  });
});
