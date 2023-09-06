/* eslint-disable max-classes-per-file */
export class AuthenticationError extends Error {
  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class InvalidCredentialError extends AuthenticationError {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialError";
  }
}
