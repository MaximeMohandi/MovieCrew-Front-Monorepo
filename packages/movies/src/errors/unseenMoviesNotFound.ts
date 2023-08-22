import ERROR_MESSAGES from "./errorMessage";
import MovieFetchError from "./movieFetchError";

export default class UnseenMoviesNotFound extends MovieFetchError {
  constructor() {
    super(ERROR_MESSAGES.NoMovieFound);
    this.name = "UnseenMoviesNotFound";
  }
}
