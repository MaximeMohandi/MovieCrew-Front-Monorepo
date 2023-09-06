/*
 should store token and expiration date if authentication is successful
 should throw error if authentication failed
 should ignore authentication if token not expired
 should rewrite token if expired
*/
describe("authenticate app", () => {
  it("should store token and expiration date if authentication is successful", () => {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

    const token = Cookies.get("token");

    expect(token).toMatch(jwtRegex);
    expect(expirationDate).toBeGreaterThan(Date.now());
  });
});
