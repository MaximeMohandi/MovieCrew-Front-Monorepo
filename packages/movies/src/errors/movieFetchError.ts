import ERROR_MESSAGES from "./errorMessage";
import MovieError from "./movieError";

export default class MovieFetchError extends MovieError {
  constructor(message?: string) {
    if (message === undefined) super(ERROR_MESSAGES.FailedToFetchMovie);
    else super(message);
    this.name = "MovieFetchError";
  }
}
