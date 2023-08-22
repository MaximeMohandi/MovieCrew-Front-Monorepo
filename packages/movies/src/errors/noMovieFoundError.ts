import ERROR_MESSAGES from "./errorMessage";
import MovieFetchError from "./movieFetchError";

export default class NoMovieFoundError extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.NoMovieFound);
    this.name = "NoMovieFoundError";
  }
}
