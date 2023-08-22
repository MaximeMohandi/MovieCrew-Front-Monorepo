import ERROR_MESSAGES from "./errorMessage";
import MovieError from "./movieError";

export default class AddMovieError extends MovieError {
  constructor(message?: string) {
    super(message || ERROR_MESSAGES.AddMovieFailed);
    this.name = "AddMovieError";
  }
}
