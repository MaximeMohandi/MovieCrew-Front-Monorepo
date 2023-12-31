import axios from "axios";
import * as authApi from "../../../src/auth/api";
import { authenticateApp } from "../../../src/auth/service";

describe("when authenticating an app", () => {
  it("authenticate to the api and set the default token and return expirationDate", async () => {
    // Arrange
    jest.spyOn(authApi, "getToken").mockReturnValue(
      Promise.resolve({
        token: "this.a.token",
        expirationDate: new Date(),
      }),
    );
    // Act
    const expirationDate = await authenticateApp(1, "secret");
    // Assert
    expect(axios.defaults.headers.common.Authorization).toEqual(
      "Bearer this.a.token",
    );
    expect(expirationDate.toDateString()).toEqual(new Date().toDateString());
  });
});
