import { rest } from "msw";
import { registerUser, RegisterUserError } from "../../../src/users";
import { REGISTER_USER_ENDPOINT } from "../../../src/users/api/endpoints";
import server, { setupTest } from "../../setupApiTest";

setupTest();

describe("register user", () => {
  it("should return username when user is registered", async () => {
    server.use(
      rest.post(REGISTER_USER_ENDPOINT, (req, res, ctx) => {
        return res(ctx.json("John Doe"));
      }),
    );
    const userRegistered = await registerUser(12345678919, "John Doe", 1);
    expect(userRegistered).toEqual("John Doe");
  });

  it("should return specific error if user exists", async () => {
    server.use(
      rest.post(REGISTER_USER_ENDPOINT, (req, res, ctx) => {
        return res(
          ctx.status(409),
          ctx.json({
            message:
              "The user Jane doe already exist. please verify the name and try again",
          }),
        );
      }),
    );

    await expect(registerUser(12345678919, "John Doe", 1)).rejects.toThrow(
      "The user Jane doe already exist. please verify the name and try again",
    );
  });

  it("should return generic error if something went wrong", async () => {
    server.use(
      rest.post(REGISTER_USER_ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    await expect(registerUser(12345678919, "John Doe", 1)).rejects.toThrow(
      new RegisterUserError(),
    );
  });
});
