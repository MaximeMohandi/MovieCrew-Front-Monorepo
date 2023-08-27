/* eslint-disable max-classes-per-file */
import ERROR_MESSAGE from "./errorMessage";

export class LoginError extends Error {
  constructor(message: string = ERROR_MESSAGE.LOGIN_ERROR) {
    super(message);
    this.name = "LoginError";
  }
}

export class RegisterUserError extends Error {
  constructor(message: string = ERROR_MESSAGE.REGISTER_ERROR) {
    super(message);
    this.name = "RegisterUserError";
  }
}
