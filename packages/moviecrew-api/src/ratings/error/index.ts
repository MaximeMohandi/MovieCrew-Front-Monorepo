import ERROR_MESSAGE from "./errorMessage";

export default class RateError extends Error {
  constructor(message?: string) {
    super(message ?? ERROR_MESSAGE.RATE_ERROR);
    this.name = "RateError";
  }
}
