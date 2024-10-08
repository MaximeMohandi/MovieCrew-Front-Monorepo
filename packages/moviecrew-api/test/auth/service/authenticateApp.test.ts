import axios from "axios";
import * as authApi from "../../../src/auth/api";
import { authenticateApp, reAuthenticateApp } from "../../../src/auth/service";

describe("when authenticating an app", () => {
  it("authenticate to the api and set the default token and URL then return expirationDate", async () => {
    // Arrange
    jest.spyOn(authApi, "getToken").mockReturnValue(
      Promise.resolve({
        token: "this.a.token",
        expirationDate: new Date(),
      }),
    );
    // Act
    const expirationDate = await authenticateApp(
      "https://fake-api.com",
      1,
      "secret",
    );
    // Assert
    expect(axios.defaults.headers.common.Authorization).toEqual(
      "Bearer this.a.token",
    );
    expect(axios.defaults.baseURL).toEqual("https://fake-api.com");
    expect(expirationDate.toDateString()).toEqual(new Date().toDateString());
  });

  it("should get new token when called with refresh", async () => {
    // Arrange
    let mockExpirationDate = new Date(Date.now());
    jest.spyOn(authApi, "getToken").mockImplementation(() => {
      mockExpirationDate = new Date(mockExpirationDate.getTime() + 10000);
      return Promise.resolve({
        token: "this.a.token",
        expirationDate: mockExpirationDate,
      });
    });

    // Act
    const expirationDate = await authenticateApp(
      "https://fake-api.com",
      1,
      "secret",
    );

    const newExpirationDate = await reAuthenticateApp();

    // Assert
    expect(expirationDate.getTime()).toBeLessThan(newExpirationDate.getTime());
  });
});
