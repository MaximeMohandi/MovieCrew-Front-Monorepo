import { rest } from "msw";
import { LoginError, loginUser } from "../../../src/users";
import { LOGIN_USER_ENDPOINT } from "../../../src/users/api/endpoints";
import server, { setupTest } from "../../setupApiTest";

setupTest();

describe("login user", () => {
  it("should return user data", async () => {
    server.use(
      rest.get(LOGIN_USER_ENDPOINT, (req, res, ctx) => {
        return res(
          ctx.json({
            id: "1234567891011",
            name: "John Doe",
            role: 1,
          }),
        );
      }),
    );
    const userLogged = await loginUser("1234567891011", "John Doe");
    expect(userLogged).toEqual({
      id: "1234567891011",
      name: "John Doe",
      role: 1,
    });
  });

  it("should return error if user not found", async () => {
    server.use(
      rest.get(LOGIN_USER_ENDPOINT, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({
            message:
              "User hiddenOne not found. Please check the conformity and try again",
          }),
        );
      }),
    );

    await expect(loginUser("1222222", "hiddenOne")).rejects.toThrow(
      "User hiddenOne not found. Please check the conformity and try again",
    );
  });

  it("should return generic error if something went wrong", async () => {
    server.use(
      rest.get(LOGIN_USER_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(loginUser("1222222", "hiddenOne")).rejects.toThrow(
      new LoginError(),
    );
  });
});
