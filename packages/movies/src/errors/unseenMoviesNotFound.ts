import ERROR_MESSAGES from "./errorMessage";
import MovieError from "./movieError";

export default class UnseenMoviesNotFound extends MovieError {
  constructor() {
    super(ERROR_MESSAGES.NoMovieFound);
    this.name = "UnseenMoviesNotFound";
  }
}
