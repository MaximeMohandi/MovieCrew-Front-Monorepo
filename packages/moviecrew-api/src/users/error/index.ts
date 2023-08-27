/* eslint-disable max-classes-per-file */
import ERROR_MESSAGE from "./errorMessage";

export class LoginError extends Error {
  constructor(message?: string) {
    super(message ?? ERROR_MESSAGE.LOGIN_ERROR);
    this.name = "LoginError";
  }
}

export class UserNotFoundError extends LoginError {
  constructor(message: string = "User not found") {
    super(message);
    this.name = "UserNotFoundError";
  }
}
