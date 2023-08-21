import ERROR_MESSAGES from "./errorMessage";

export default class MovieError extends Error {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.FailedToFetchMovie);
    else super(message);
    this.name = "MovieError";
  }
}
